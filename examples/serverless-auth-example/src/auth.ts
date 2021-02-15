import { APIGatewayEvent } from "aws-lambda"
import * as db from "simple-dynamodb"
import sha256 from "crypto-js/sha256"
import omit from "lodash.omit"

function response(statusCode: number, body: any) {
  return {
    statusCode,
    // permissive CORS headers
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(body),
  }
}

// Hashing your password before saving is critical
// Hashing is one-way meaning you can never guess the password
// Adding a salt and the username guards against common passwords
function hashPassword(username: string, password: string) {
  return sha256(
    `${password}${process.env.SALT}${username}${password}`
  ).toString()
}

async function createUser(username: string, password: string) {
  const result = await db.updateItem({
    TableName: process.env.USER_TABLE!,
    Key: {
      username,
    },
    UpdateExpression: `SET password = :password, createdAt = :createdAt`,
    ExpressionAttributeValues: {
      ":password": hashPassword(username, password),
      ":createdAt": new Date().toISOString(),
    },
  })
  return result.Attributes
}

// Logs you in based on username/password combo
// Creates user on first login
export const login = async (event: APIGatewayEvent) => {
  const { username, password } = JSON.parse(event.body || "{}")

  if (!username || !password) {
    return response(400, {
      status: "error",
      error: "Please provide a username and password",
    })
  }

  // find user in database
  let { Item: user } = await db.getItem({
    TableName: process.env.USER_TABLE!,
    Key: {
      // username is the key, which means it must be unique
      username,
    },
  })

  if (!user) {
    // user was not found, create
    user = await createUser(username, password)
  } else {
    // check credentials
    if (hashPassword(username, password) !== user.password) {
      // 🚨
      return response(401, {
        status: "error",
        error: "Bad username/password combination",
      })
    }
  }

  // user was created or has valid credentials

  return response(200, omit(user, "password"))
}
