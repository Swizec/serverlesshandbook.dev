import { Browser } from "puppeteer"

import { createHandler } from "./util"

async function scrapeGoogle(browser: Browser, search: string) {
  const page = await browser.newPage()
  await page.goto("https://google.com", {
    waitUntil: ["domcontentloaded", "networkidle2"],
  })

  // this part is specific to the page you're scraping
  await page.type("input[type=text]", search)

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click("input[type=submit]"),
  ])

  if (!response.ok()) {
    throw "Couldn't get response"
  }

  await page.goto(response.url())

  // this part is very specific to the page you're scraping
  const searchResults = await page.$$(".rc")

  let links = await Promise.all(
    searchResults.map(async (result) => {
      return {
        url: await result.$eval("a", (node) => node.getAttribute("href")),
        title: await result.$eval("h3", (node) => node.innerHTML),
        description: await result.$eval("span.st", (node) => node.innerHTML),
      }
    })
  )

  return {
    statusCode: 200,
    body: JSON.stringify(links),
  }
}

export const handler = createHandler(scrapeGoogle)
