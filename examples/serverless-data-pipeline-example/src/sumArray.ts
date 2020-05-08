import { APIGatewayEvent } from "aws-lambda"
import uuidv4 from "uuid/v4"
import { response } from "./utils"

interface APIResponse {
  statusCode: number
  body: string
}

export const handler = async (event: APIGatewayEvent): Promise<APIResponse> => {
  const requestId = uuidv4()

  if (!event.body) {
    return response(400, {
      status: "error",
      error: "Provide a JSON body",
    })
  }

  const array = JSON.parse(event.body)

  return response(200, {
    status: "success",
    array,
  })
}
