"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dynamoDB = new aws_sdk_1.default.DynamoDB.DocumentClient();
exports.updateItem = async (params) => {
    const query = {
        ...params,
    };
    return new Promise((resolve, reject) => {
        dynamoDB.update(query, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
// collect all fields in a JSON object into a DynamoDB expression
exports.buildExpression = (body) => {
    return Object.keys(body)
        .map((key) => `${key} = :${key}`)
        .join(", ");
};
exports.buildAttributes = (body) => {
    return Object.fromEntries(Object.entries(body).map(([key, value]) => [
        `:${key}`,
        typeof value === "string" || typeof value === "number"
            ? value
            : JSON.stringify(value),
    ]));
};
exports.getItem = async (params) => {
    const query = {
        ...params,
    };
    return new Promise((resolve, reject) => {
        dynamoDB.get(query, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.scanItems = async (params) => {
    const query = {
        ...params,
    };
    return new Promise((resolve, reject) => {
        dynamoDB.scan(query, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.deleteItem = async (params) => {
    const query = {
        ...params,
    };
    return new Promise((resolve, reject) => {
        dynamoDB.delete(query, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZHluYW1vZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBeUI7QUFFekIsTUFBTSxRQUFRLEdBQUcsSUFBSSxpQkFBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtBQXdDckMsUUFBQSxVQUFVLEdBQUcsS0FBSyxFQUM3QixNQUF3QixFQUMrQixFQUFFO0lBQ3pELE1BQU0sS0FBSyxHQUFHO1FBQ1osR0FBRyxNQUFNO0tBQ1YsQ0FBQTtJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ1o7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ2hCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELGlFQUFpRTtBQUNwRCxRQUFBLGVBQWUsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO0lBQzNDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDckIsR0FBRyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDZixDQUFDLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO0lBQzNDLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDekMsSUFBSSxHQUFHLEVBQUU7UUFDVCxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtZQUNwRCxDQUFDLENBQUMsS0FBSztZQUNQLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztLQUMxQixDQUFDLENBQ0gsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLEtBQUssRUFDMUIsTUFBcUIsRUFDK0IsRUFBRTtJQUN0RCxNQUFNLEtBQUssR0FBRztRQUNaLEdBQUcsTUFBTTtLQUNWLENBQUE7SUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2xDLElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNaO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTthQUNoQjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFWSxRQUFBLFNBQVMsR0FBRyxLQUFLLEVBQzVCLE1BQXVCLEVBQzBCLEVBQUU7SUFDbkQsTUFBTSxLQUFLLEdBQUc7UUFDWixHQUFHLE1BQU07S0FDVixDQUFBO0lBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLEdBQUcsRUFBRTtnQkFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDWjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDaEI7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUcsS0FBSyxFQUM3QixNQUF3QixFQUMrQixFQUFFO0lBQ3pELE1BQU0sS0FBSyxHQUFHO1FBQ1osR0FBRyxNQUFNO0tBQ1YsQ0FBQTtJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ1o7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ2hCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQSJ9