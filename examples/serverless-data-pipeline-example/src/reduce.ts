import { SQSEvent, SQSRecord } from "aws-lambda"
import * as db from "simple-dynamodb"

import { sendSQSMessage, fetchSQSMessage, Packet } from "./utils"

export const handler = async (event: SQSEvent) => {
  // grab messages from queue
  // hopefully batchSize allowed us to get multiple
  let packets: Packet[] = event.Records.map((record: SQSRecord) =>
    JSON.parse(record.body)
  )

  // another approach here would be to use an intermediary DynamoDB table
  // trigger a reduce method and it grabs items from Dynamo to process

  if (!isBatch(packets)) {
    packets = await ensureBatch(packets)
  }

  if (packets.length < 2 && !seenTooOften(packets[0])) {
    // didn't get a batch, try again
    await sendSQSMessage(process.env.reduceQueueURL!, {
      ...packets[0],
      seenTimes: packets[0].seenTimes ? packets[0].seenTimes + 1 : 1,
    })

    return false
  }

  console.log("PACKETS", packets)

  // sum packets together
  // TODO: no guarantee they belong to same requestId
  // left as an exercise to the reader :P
  const sum = packets
    .map((packet) => packet.number)
    .reduce((sum, num) => sum + num, 0)

  // how much work is left?
  const arrayLength = packets[0].arrayLength - packets.length

  console.log(arrayLength)

  if (arrayLength <= 1) {
    // save result
    await db.updateItem({
      TableName: process.env.SUMS_TABLE!,
      Key: {
        arrayId: packets[0].arrayId,
      },
      UpdateExpression: `SET resultSum = :resultSum`,
      ExpressionAttributeValues: {
        ":resultSum": sum,
      },
    })
  } else {
    // trigger next reduce step in pipeline
    await sendSQSMessage(process.env.reduceQueueURL!, {
      arrayId: packets[0].arrayId,
      arrayLength,
      number: sum,
    })
  }

  return true
}

async function ensureBatch(packets: Packet[]) {
  let newPackets: Packet[] = []
  // didn't get a batch, try to fetch a packet
  try {
    const result = await fetchSQSMessage(process.env.reduceQueueURL!)

    console.log(result)

    if (result.Messages && result.Messages.length > 0) {
      // got more packets, continue
      newPackets = result.Messages.map((msg: AWS.SQS.Message) =>
        JSON.parse(msg.Body!)
      )
    }
  } catch (e) {
    console.error(e)
    throw "Error fetching from queue"
  }

  return [...packets, ...newPackets]
}

function isBatch(packets: Packet[]) {
  return packets.length >= 2 || packets[0].arrayLength <= 1
}

function seenTooOften(packet: Packet) {
  return packet.seenTimes && packet.seenTimes > 5
}
