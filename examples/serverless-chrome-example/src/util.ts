import { APIGatewayEvent } from "aws-lambda"
import { Browser } from "puppeteer"
import chrome from "chrome-aws-lambda"

export type APIResponse = {
  statusCode: number
  headers?: { [key: string]: string }
  body: string | Buffer
  isBase64Encoded?: boolean
}

export async function getChrome() {
  let browser = null

  try {
    browser = await chrome.puppeteer.launch({
      args: chrome.args,
      defaultViewport: {
        width: 1920,
        height: 1080,
        isMobile: true,
        deviceScaleFactor: 2,
      },
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
      ignoreHTTPSErrors: true,
    })
  } catch (err) {
    console.error("Error launching chrome")
    console.error(err)
  }

  return browser
}

// both scraper and screenshot have the same basic handler
// they just call a different method to do things
export const createHandler = (
  workFunction: (browser: Browser, search: string) => Promise<APIResponse>
) => async (event: APIGatewayEvent): Promise<APIResponse> => {
  const search =
    event.queryStringParameters && event.queryStringParameters.search

  if (!search) {
    return {
      statusCode: 400,
      body: "Please provide a ?search= parameter",
    }
  }

  const browser = await getChrome()

  if (!browser) {
    return {
      statusCode: 500,
      body: "Error launching Chrome",
    }
  }

  try {
    // call the function that does the real work
    const response = await workFunction(browser, search)

    return response
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: "Error scraping Google",
    }
  }
}
