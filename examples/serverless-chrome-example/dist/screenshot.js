"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = require("./util");
async function screenshotGoogle(browser, search) {
    const page = await browser.newPage();
    await page.goto("https://google.com", {
        waitUntil: ["domcontentloaded", "networkidle2"],
    });
    // this part is specific to the page you're screenshotting
    await page.type("input[type=text]", search);
    const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click("input[type=submit]"),
    ]);
    if (!response.ok()) {
        throw "Couldn't get response";
    }
    await page.goto(response.url());
    // this part is specific to the page you're screenshotting
    const element = await page.$("#main");
    if (!element) {
        throw "Couldn't find results div";
    }
    const boundingBox = await element.boundingBox();
    const imagePath = `/tmp/screenshot-${new Date().getTime()}.png`;
    if (!boundingBox) {
        throw "Couldn't measure size of results div";
    }
    await page.screenshot({
        path: imagePath,
        clip: boundingBox,
    });
    const data = fs_1.default.readFileSync(imagePath).toString("base64");
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "image/png",
        },
        body: data,
        isBase64Encoded: true,
    };
}
exports.handler = util_1.createHandler(screenshotGoogle);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuc2hvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY3JlZW5zaG90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNENBQW1CO0FBRW5CLGlDQUFzQztBQUV0QyxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsT0FBZ0IsRUFBRSxNQUFjO0lBQzlELE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3BDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtRQUNwQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLENBQUM7S0FDaEQsQ0FBQyxDQUFBO0lBRUYsMERBQTBEO0lBQzFELE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUUzQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO0tBQ2pDLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDbEIsTUFBTSx1QkFBdUIsQ0FBQTtLQUM5QjtJQUVELE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUUvQiwwREFBMEQ7SUFDMUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXJDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixNQUFNLDJCQUEyQixDQUFBO0tBQ2xDO0lBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDL0MsTUFBTSxTQUFTLEdBQUcsbUJBQW1CLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQTtJQUUvRCxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2hCLE1BQU0sc0NBQXNDLENBQUE7S0FDN0M7SUFFRCxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEIsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsV0FBVztLQUNsQixDQUFDLENBQUE7SUFFRixNQUFNLElBQUksR0FBRyxZQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxRCxPQUFPO1FBQ0wsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsV0FBVztTQUM1QjtRQUNELElBQUksRUFBRSxJQUFJO1FBQ1YsZUFBZSxFQUFFLElBQUk7S0FDdEIsQ0FBQTtBQUNILENBQUM7QUFFWSxRQUFBLE9BQU8sR0FBRyxvQkFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUEifQ==