import { SQSEvent, SQSRecord } from "aws-lambda"
import { sendSQSMessage, Packet } from "./utils"
import * as db from "simple-dynamodb"

export const handler = async (event: SQSEvent) => {
  // grab messages from queue
  // depending on batchSize there could be multiple
  let packets: Packet[] = event.Records.map((record: SQSRecord) =>
    JSON.parse(record.body)
  )

  // iterate packets and multiply by 2
  // this would be a more expensive operation usually
  packets = packets.map((packet) => ({
    ...packet,
    packetValue: packet.packetValue * 2,
  }))

  // store each result in scratchpad table
  // in theory it's enough to put them on the queue
  // an intermediary table makes the reduce step easier to implement
  await Promise.all(
    packets.map((packet) =>
      db.updateItem({
        TableName: process.env.SCRATCHPAD_TABLE!,
        Key: { arrayId: packet.arrayId, packetId: packet.packetId },
        UpdateExpression:
          "SET packetValue = :packetValue, arrayLength = :arrayLength, packetContains = :packetContains",
        ExpressionAttributeValues: {
          ":packetValue": packet.packetValue,
          ":arrayLength": packet.arrayLength,
          ":packetContains": packet.packetContains,
        },
      })
    )
  )

  // trigger next step in calculation
  const uniqueArrayIds = Array.from(
    new Set(packets.map((packet) => packet.arrayId))
  )

  await Promise.all(
    uniqueArrayIds.map((arrayId) =>
      sendSQSMessage(process.env.reduceQueueURL!, arrayId)
    )
  )

  return true
}
