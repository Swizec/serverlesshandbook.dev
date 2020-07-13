import { Browser } from "puppeteer"
import fs from "fs"

import { createHandler } from "./util"

async function screenshotGoogle(browser: Browser, search: string) {
  const page = await browser.newPage()
  await page.goto("https://google.com", {
    waitUntil: ["domcontentloaded", "networkidle2"],
  })

  // this part is specific to the page you're screenshotting
  await page.type("input[type=text]", search)

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click("input[type=submit]"),
  ])

  if (!response.ok()) {
    throw "Couldn't get response"
  }

  await page.goto(response.url())

  // this part is specific to the page you're screenshotting
  const element = await page.$("#main")

  if (!element) {
    throw "Couldn't find results div"
  }

  const boundingBox = await element.boundingBox()
  const imagePath = `/tmp/screenshot-${new Date().getTime()}.png`

  if (!boundingBox) {
    throw "Couldn't measure size of results div"
  }

  await page.screenshot({
    path: imagePath,
    clip: boundingBox,
  })

  const data = fs.readFileSync(imagePath).toString("base64")

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
    },
    body: data,
    isBase64Encoded: true,
  }
}

export const handler = createHandler(screenshotGoogle)
