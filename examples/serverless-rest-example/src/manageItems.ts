import { APIGatewayEvent } from "aws-lambda"
import { APIResponse } from "./types"
import * as db from "./dynamodb"
import uuidv4 from "uuid/v4"

function response(statusCode: number, body: any) {
  return {
    statusCode,
    body: JSON.stringify(body),
  }
}

// fetch using /item/ID
export const getItem = async (event: APIGatewayEvent): Promise<APIResponse> => {
  const itemId = event.pathParameters ? event.pathParameters.itemId : ""

  const item = await db.getItem({
    TableName: process.env.ITEM_TABLE!,
    Key: { itemId },
  })

  if (item.Item) {
    return response(200, {
      status: "success",
      item: item.Item,
    })
  } else {
    return response(404, {
      status: "error",
      error: "Item not found",
    })
  }
}

// upsert an item
// /item or /item/ID
export const updateItem = async (
  event: APIGatewayEvent
): Promise<APIResponse> => {
  let itemId = event.pathParameters ? event.pathParameters.itemId : uuidv4()

  let createdAt = new Date().toISOString()

  if (event.pathParameters && event.pathParameters.itemId) {
    // find item if exists
    const find = await db.getItem({
      TableName: process.env.ITEM_TABLE!,
      Key: { itemId },
    })
    if (find.Item) {
      // save createdAt so we don't overwrite on update
      createdAt = find.Item.createdAt
    } else {
      return response(404, {
        status: "error",
        error: `Item not found ${event.pathParameters.itemId}`,
      })
    }
  }

  if (!event.body) {
    return response(400, {
      status: "error",
      error: "Provide a JSON body",
    })
  }

  let body = JSON.parse(event.body)

  if (body.itemId) {
    // this will confuse DynamoDB, you can't update the key
    delete body.itemId
  }

  const item = await db.updateItem({
    TableName: process.env.ITEM_TABLE!,
    Key: { itemId },
    UpdateExpression: `SET ${db.buildExpression(
      body
    )}, createdAt = :createdAt, lastUpdatedAt = :lastUpdatedAt`,
    ExpressionAttributeValues: {
      ...db.buildAttributes(body),
      ":createdAt": createdAt,
      ":lastUpdatedAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  })

  return response(200, {
    status: "success",
    item: item.Attributes,
  })
}

export const deleteItem = async (
  event: APIGatewayEvent
): Promise<APIResponse> => {
  const itemId = event.pathParameters ? event.pathParameters.itemId : null

  if (!itemId) {
    return response(400, {
      status: "error",
      error: "Provide an itemId",
    })
  }

  // DynamoDB handles deleting already deleted files, no error :)
  const item = await db.deleteItem({
    TableName: process.env.ITEM_TABLE!,
    Key: { itemId },
    ReturnValues: "ALL_OLD",
  })

  return response(200, {
    status: "success",
    itemWas: item.Attributes,
  })
}
