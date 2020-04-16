"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("simple-dynamodb"));
const v4_1 = __importDefault(require("uuid/v4"));
// upsert an item
// item(name, ...) or item(id, name, ...)
exports.updateItem = async (_, args) => {
    let itemId = args.id ? args.id : v4_1.default();
    let createdAt = new Date().toISOString();
    // find item if exists
    if (args.id) {
        const find = await db.getItem({
            TableName: process.env.ITEM_TABLE,
            Key: { itemId },
        });
        if (find.Item) {
            // save createdAt so we don't overwrite on update
            createdAt = find.Item.createdAt;
        }
        else {
            throw "Item not found";
        }
    }
    const updateValues = {
        name: args.name,
        body: args.body,
    };
    const item = await db.updateItem({
        TableName: process.env.ITEM_TABLE,
        Key: { itemId },
        UpdateExpression: `SET ${db.buildExpression(updateValues)}, createdAt = :createdAt, updatedAt = :updatedAt`,
        ExpressionAttributeValues: {
            ...db.buildAttributes(updateValues),
            ":createdAt": createdAt,
            ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
    });
    return item.Attributes;
};
exports.deleteItem = async (_, args) => {
    // DynamoDB handles deleting already deleted files, no error :)
    const item = await db.deleteItem({
        TableName: process.env.ITEM_TABLE,
        Key: {
            itemId: args.id,
        },
        ReturnValues: "ALL_OLD",
    });
    return item.Attributes;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL211dGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxvREFBcUM7QUFDckMsaURBQTRCO0FBUTVCLGlCQUFpQjtBQUNqQix5Q0FBeUM7QUFDNUIsUUFBQSxVQUFVLEdBQUcsS0FBSyxFQUFFLENBQU0sRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUN6RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFNLEVBQUUsQ0FBQTtJQUV6QyxJQUFJLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBRXhDLHNCQUFzQjtJQUN0QixJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDWCxNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDNUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVztZQUNsQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUU7U0FDaEIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsaURBQWlEO1lBQ2pELFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQTtTQUNoQzthQUFNO1lBQ0wsTUFBTSxnQkFBZ0IsQ0FBQTtTQUN2QjtLQUNGO0lBRUQsTUFBTSxZQUFZLEdBQUc7UUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0tBQ2hCLENBQUE7SUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDL0IsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVztRQUNsQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUU7UUFDZixnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQ3pDLFlBQVksQ0FDYixrREFBa0Q7UUFDbkQseUJBQXlCLEVBQUU7WUFDekIsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztZQUNuQyxZQUFZLEVBQUUsU0FBUztZQUN2QixZQUFZLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7U0FDdkM7UUFDRCxZQUFZLEVBQUUsU0FBUztLQUN4QixDQUFDLENBQUE7SUFFRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7QUFDeEIsQ0FBQyxDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUcsS0FBSyxFQUFFLENBQU0sRUFBRSxJQUFvQixFQUFFLEVBQUU7SUFDL0QsK0RBQStEO0lBQy9ELE1BQU0sSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUMvQixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFXO1FBQ2xDLEdBQUcsRUFBRTtZQUNILE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNoQjtRQUNELFlBQVksRUFBRSxTQUFTO0tBQ3hCLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtBQUN4QixDQUFDLENBQUEifQ==