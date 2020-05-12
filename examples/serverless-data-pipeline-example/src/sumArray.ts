import { APIGatewayEvent } from "aws-lambda"
import uuidv4 from "uuid/v4"
import { response, sendSQSMessage } from "./utils"

interface APIResponse {
  statusCode: number
  body: string
}

export const handler = async (event: APIGatewayEvent): Promise<APIResponse> => {
  const arrayId = uuidv4()

  if (!event.body) {
    return response(400, {
      status: "error",
      error: "Provide a JSON body",
    })
  }

  const array: number[] = JSON.parse(event.body)

  // split array into elements
  // trigger timesTwo lambda for each entry
  for (let number of array) {
    await sendSQSMessage(process.env.timesTwoQueueURL!, {
      arrayId,
      arrayLength: array.length,
      number,
    })
  }

  return response(200, {
    status: "success",
    array,
    arrayId,
  })
}
