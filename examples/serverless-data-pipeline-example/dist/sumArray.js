"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
function response(statusCode, body) {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
}
exports.handler = async (event) => {
    const requestId = v4_1.default();
    if (!event.body) {
        return response(400, {
            status: "error",
            error: "Provide a JSON body",
        });
    }
    const array = JSON.parse(event.body);
    return response(200, {
        status: "success",
        array,
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtQXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3VtQXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxpREFBNEI7QUFPNUIsU0FBUyxRQUFRLENBQUMsVUFBa0IsRUFBRSxJQUFTO0lBQzdDLE9BQU87UUFDTCxVQUFVO1FBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQzNCLENBQUE7QUFDSCxDQUFDO0FBRVksUUFBQSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQXNCLEVBQXdCLEVBQUU7SUFDNUUsTUFBTSxTQUFTLEdBQUcsWUFBTSxFQUFFLENBQUE7SUFFMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDZixPQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsTUFBTSxFQUFFLE9BQU87WUFDZixLQUFLLEVBQUUscUJBQXFCO1NBQzdCLENBQUMsQ0FBQTtLQUNIO0lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFcEMsT0FBTyxRQUFRLENBQUMsR0FBRyxFQUFFO1FBQ25CLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLEtBQUs7S0FDTixDQUFDLENBQUE7QUFDSixDQUFDLENBQUEifQ==