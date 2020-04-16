import * as db from "simple-dynamodb"

// fetch using item(id: String)
export const item = async (_: any, args: { id: string }) => {
  const item = await db.getItem({
    TableName: process.env.ITEM_TABLE!,
    Key: {
      itemId: args.id,
    },
  })

  return item.Item
}
