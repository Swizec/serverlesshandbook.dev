"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
async function scrapeGoogle(browser, search) {
    const page = await browser.newPage();
    await page.goto("https://google.com", {
        waitUntil: ["domcontentloaded", "networkidle2"],
    });
    // this part is specific to the page you're scraping
    await page.type("input[type=text]", search);
    const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click("input[type=submit]"),
    ]);
    if (!response.ok()) {
        throw "Couldn't get response";
    }
    await page.goto(response.url());
    // this part is very specific to the page you're scraping
    const searchResults = await page.$$(".rc");
    let links = await Promise.all(searchResults.map(async (result) => {
        return {
            url: await result.$eval("a", (node) => node.getAttribute("href")),
            title: await result.$eval("h3", (node) => node.innerHTML),
            description: await result.$eval("span.st", (node) => node.innerHTML),
        };
    }));
    return {
        statusCode: 200,
        body: JSON.stringify(links),
    };
}
exports.handler = util_1.createHandler(scrapeGoogle);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyYXBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY3JhcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsaUNBQXNDO0FBRXRDLEtBQUssVUFBVSxZQUFZLENBQUMsT0FBZ0IsRUFBRSxNQUFjO0lBQzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3BDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtRQUNwQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLENBQUM7S0FDaEQsQ0FBQyxDQUFBO0lBRUYsb0RBQW9EO0lBQ3BELE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUUzQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO0tBQ2pDLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDbEIsTUFBTSx1QkFBdUIsQ0FBQTtLQUM5QjtJQUVELE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUUvQix5REFBeUQ7SUFDekQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRTFDLElBQUksS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDM0IsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDakMsT0FBTztZQUNMLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3pELFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3JFLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFBO0lBRUQsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0tBQzVCLENBQUE7QUFDSCxDQUFDO0FBRVksUUFBQSxPQUFPLEdBQUcsb0JBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQSJ9