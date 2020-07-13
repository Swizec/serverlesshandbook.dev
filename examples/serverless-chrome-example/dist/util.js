"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
async function getChrome() {
    let browser = null;
    try {
        browser = await chrome_aws_lambda_1.default.puppeteer.launch({
            args: chrome_aws_lambda_1.default.args,
            defaultViewport: {
                width: 1920,
                height: 1080,
                isMobile: true,
                deviceScaleFactor: 2,
            },
            executablePath: await chrome_aws_lambda_1.default.executablePath,
            headless: chrome_aws_lambda_1.default.headless,
            ignoreHTTPSErrors: true,
        });
    }
    catch (err) {
        console.error("Error launching chrome");
        console.error(err);
    }
    return browser;
}
exports.getChrome = getChrome;
// both scraper and screenshot have the same basic handler
// they just call a different method to do things
exports.createHandler = (workFunction) => async (event) => {
    const search = event.queryStringParameters && event.queryStringParameters.search;
    if (!search) {
        return {
            statusCode: 400,
            body: "Please provide a ?search= parameter",
        };
    }
    const browser = await getChrome();
    if (!browser) {
        return {
            statusCode: 500,
            body: "Error launching Chrome",
        };
    }
    try {
        // call the function that does the real work
        const response = await workFunction(browser, search);
        return response;
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: "Error scraping Google",
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsMEVBQXNDO0FBUy9CLEtBQUssVUFBVSxTQUFTO0lBQzdCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQTtJQUVsQixJQUFJO1FBQ0YsT0FBTyxHQUFHLE1BQU0sMkJBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ3RDLElBQUksRUFBRSwyQkFBTSxDQUFDLElBQUk7WUFDakIsZUFBZSxFQUFFO2dCQUNmLEtBQUssRUFBRSxJQUFJO2dCQUNYLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2dCQUNkLGlCQUFpQixFQUFFLENBQUM7YUFDckI7WUFDRCxjQUFjLEVBQUUsTUFBTSwyQkFBTSxDQUFDLGNBQWM7WUFDM0MsUUFBUSxFQUFFLDJCQUFNLENBQUMsUUFBUTtZQUN6QixpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQTtLQUNIO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNuQjtJQUVELE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUM7QUF0QkQsOEJBc0JDO0FBRUQsMERBQTBEO0FBQzFELGlEQUFpRDtBQUNwQyxRQUFBLGFBQWEsR0FBRyxDQUMzQixZQUF3RSxFQUN4RSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQXNCLEVBQXdCLEVBQUU7SUFDMUQsTUFBTSxNQUFNLEdBQ1YsS0FBSyxDQUFDLHFCQUFxQixJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUE7SUFFbkUsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNYLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxxQ0FBcUM7U0FDNUMsQ0FBQTtLQUNGO0lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxTQUFTLEVBQUUsQ0FBQTtJQUVqQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLHdCQUF3QjtTQUMvQixDQUFBO0tBQ0Y7SUFFRCxJQUFJO1FBQ0YsNENBQTRDO1FBQzVDLE1BQU0sUUFBUSxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUVwRCxPQUFPLFFBQVEsQ0FBQTtLQUNoQjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNoQixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsdUJBQXVCO1NBQzlCLENBQUE7S0FDRjtBQUNILENBQUMsQ0FBQSJ9