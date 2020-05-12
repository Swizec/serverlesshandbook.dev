import AWS from "aws-sdk"

export type Packet = {
  arrayId: string
  arrayLength: number
  number: number
  seenTimes?: number
}

export const sendSQSMessage = async (QueueURL: string, Message: any) => {
  Message = JSON.stringify(Message)

  console.log(`SQSing ${Message} to ${QueueURL}`)

  return new AWS.SQS()
    .sendMessage({
      MessageBody: Message,
      QueueUrl: QueueURL,
    })
    .promise()
}

export const fetchSQSMessage = async (QueueURL: string) => {
  console.log(`fetchSQSing from ${QueueURL}`)

  return new AWS.SQS()
    .receiveMessage({
      QueueUrl: QueueURL,
      WaitTimeSeconds: 1,
    })
    .promise()
}

export function response(statusCode: number, body: any) {
  return {
    statusCode,
    body: JSON.stringify(body),
  }
}
