"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("simple-dynamodb"));
function remapProps(item) {
    return {
        ...item,
        id: item.itemId,
        name: item.itemName,
    };
}
// fetch using item(id: String)
exports.item = async (_, args) => {
    const item = await db.getItem({
        TableName: process.env.ITEM_TABLE,
        Key: {
            itemId: args.id,
        },
    });
    return remapProps(item.Item);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG9EQUFxQztBQUVyQyxTQUFTLFVBQVUsQ0FBQyxJQUFTO0lBQzNCLE9BQU87UUFDTCxHQUFHLElBQUk7UUFDUCxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU07UUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVE7S0FDcEIsQ0FBQTtBQUNILENBQUM7QUFFRCwrQkFBK0I7QUFDbEIsUUFBQSxJQUFJLEdBQUcsS0FBSyxFQUFFLENBQU0sRUFBRSxJQUFvQixFQUFFLEVBQUU7SUFDekQsTUFBTSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQzVCLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVc7UUFDbEMsR0FBRyxFQUFFO1lBQ0gsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2hCO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzlCLENBQUMsQ0FBQSJ9