import { SQSEvent, SQSRecord } from "aws-lambda"
import { sendSQSMessage, Packet } from "./utils"

export const handler = async (event: SQSEvent) => {
  // grab messages from queue
  let packets: Packet[] = event.Records.map((record: SQSRecord) =>
    JSON.parse(record.body)
  )

  console.log(packets)

  // iterate packets and multiply by 2
  // this would be a more expensive operation usually
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
