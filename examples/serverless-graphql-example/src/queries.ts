import * as db from "simple-dynamodb"

function remapProps(item: any) {
  return {
    ...item,
    id: item.itemId,
    name: item.itemName,
  }
}

// fetch using item(id: String)
export const item = async (_: any, args: { id: string }) => {
  const item = await db.getItem({
    TableName: process.env.ITEM_TABLE!,
    Key: {
      itemId: args.id,
    },
  })

  return remapProps(item.Item)
}
