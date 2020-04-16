import * as db from "simple-dynamodb"
import uuidv4 from "uuid/v4"

type ItemArgs = {
  id: string
  name: string
  body: string
}

function remapProps(item: any) {
  return {
    ...item,
    id: item.itemId,
    name: item.itemName,
  }
}

// upsert an item
// item(name, ...) or item(id, name, ...)
export const updateItem = async (_: any, args: ItemArgs) => {
  let itemId = args.id ? args.id : uuidv4()

  let createdAt = new Date().toISOString()

  // find item if exists
  if (args.id) {
    const find = await db.getItem({
      TableName: process.env.ITEM_TABLE!,
      Key: { itemId },
    })

    if (find.Item) {
      // save createdAt so we don't overwrite on update
      createdAt = find.Item.createdAt
    } else {
      throw "Item not found"
    }
  }

  const updateValues = {
    itemName: args.name,
    body: args.body,
  }

  const item = await db.updateItem({
    TableName: process.env.ITEM_TABLE!,
    Key: { itemId },
    UpdateExpression: `SET ${db.buildExpression(
      updateValues
    )}, createdAt = :createdAt, updatedAt = :updatedAt`,
    ExpressionAttributeValues: {
      ...db.buildAttributes(updateValues),
      ":createdAt": createdAt,
      ":updatedAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  })

  return remapProps(item.Attributes)
}

export const deleteItem = async (_: any, args: { id: string }) => {
  // DynamoDB handles deleting already deleted files, no error :)
  const item = await db.deleteItem({
    TableName: process.env.ITEM_TABLE!,
    Key: {
      itemId: args.id,
    },
    ReturnValues: "ALL_OLD",
  })

  return remapProps(item.Attributes)
}
