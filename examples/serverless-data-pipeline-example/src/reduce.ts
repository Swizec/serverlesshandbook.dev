import { SQSEvent, SQSRecord } from "aws-lambda"
import * as db from "simple-dynamodb"

import { sendSQSMessage, Packet } from "./utils"

export const handler = async (event: SQSEvent) => {
  // grab messages from queue
  // we rely on batchSize to ensure there's more than 1
  const packets: Packet[] = event.Records.map((record: SQSRecord) =>
    JSON.parse(record.body)
  )

  // sum packets together
  // TODO: no guarantee they belong to same requestId
  // left as an exercise to the reader :P
  const sum = packets
    .map((packet) => packet.number)
    .reduce((sum, num) => sum + num, 0)

  // how much work is left?
  const arrayLength = packets[0].arrayLength - packets.length

  if (arrayLength <= 1) {
    // save result
    await db.updateItem({
      TableName: process.env.RESULTS_TABLE!,
      Key: {
        resultId: packets[0].arrayId,
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
