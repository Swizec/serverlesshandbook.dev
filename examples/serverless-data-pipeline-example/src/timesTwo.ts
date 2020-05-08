import { SQSEvent, SQSRecord } from "aws-lambda"
import { sendSQSMessage, Packet } from "./utils"

export const handler = async (event: SQSEvent) => {
  // grab messages from queue
  let packets: Packet[] = event.Records.map((record: SQSRecord) =>
    JSON.parse(record.body)
  )

  // iterate packets and multiply by 2
  packets = packets.map((packet) => ({
    ...packet,
    number: packet.number * 2,
  }))

  // trigger next step in pipeline
  for (let packet of packets) {
    await sendSQSMessage(process.env.reduceQueueURL!, packet)
  }

  return true
}
