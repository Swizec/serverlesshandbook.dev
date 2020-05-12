import { SQSEvent, SQSRecord } from "aws-lambda"
import * as db from "simple-dynamodb"
import uuidv4 from "uuid/v4"

import { sendSQSMessage, Packet } from "./utils"

export const handler = async (event: SQSEvent) => {
  // grab messages from queue
  // depending on batchSize there could be multiple
  let arrayIds: string[] = event.Records.map((record: SQSRecord) =>
    JSON.parse(record.body)
  )

  // process each ID from batch
  await Promise.all(arrayIds.map(reduceArray))
}

async function reduceArray(arrayId: string) {
  // grab 2 entries from scratchpad table
  // IRL you'd grab as many as you can cost-effectively process in execution
  // depends what you're doing
  const packets = await readPackets(arrayId)

  if (packets.length > 0) {
    // sum packets together
    const sum = packets.reduce(
      (sum: number, packet: Packet) => sum + packet.packetValue,
      0
    )

    // add the new item sum to scratchpad table
    // we do this first so we don't delete rows if it fails
    const newPacket = {
      arrayId,
      packetId: uuidv4(),
      arrayLength: packets[0].arrayLength,
      packetValue: sum,
      packetContains: packets.reduce(
        (count: number, packet: Packet) => count + packet.packetContains,
        0
      ),
    }
    await db.updateItem({
      TableName: process.env.SCRATCHPAD_TABLE!,
      Key: {
        arrayId,
        packetId: uuidv4(),
      },
      UpdateExpression:
        "SET packetValue = :packetValue, arrayLength = :arrayLength, packetContains = :packetContains",
      ExpressionAttributeValues: {
        ":packetValue": newPacket.packetValue,
        ":arrayLength": newPacket.arrayLength,
        ":packetContains": newPacket.packetContains,
      },
    })

    // delete the 2 rows we just summed
    await cleanup(packets)

    // are we done?
    if (newPacket.packetContains >= newPacket.arrayLength) {
      // done, save sum to final table
      await db.updateItem({
        TableName: process.env.SUMS_TABLE!,
        Key: {
          arrayId,
        },
        UpdateExpression: "SET resultSum = :resultSum",
        ExpressionAttributeValues: {
          ":resultSum": sum,
        },
      })
    } else {
      // not done, trigger another reduce step
      await sendSQSMessage(process.env.reduceQueueURL!, arrayId)
    }
  }
}

async function readPackets(arrayId: string): Promise<Packet[]> {
  const result = await db.scanItems({
    TableName: process.env.SCRATCHPAD_TABLE!,
    FilterExpression: "#arrayId = :arrayId",
    ExpressionAttributeNames: { "#arrayId": "arrayId" },
    ExpressionAttributeValues: { ":arrayId": arrayId },
    Limit: 2,
  })

  if (result.Items) {
    return result.Items as Packet[]
  } else {
    return []
  }
}

async function cleanup(packets: Packet[]) {
  await Promise.all(
    packets.map((packet) =>
      db.deleteItem({
        TableName: process.env.SCRATCHPAD_TABLE!,
        Key: {
          arrayId: packet.arrayId,
          packetId: packet.packetId,
        },
      })
    )
  )
}
