import { APIGatewayEvent } from "aws-lambda"
import * as db from "simple-dynamodb"
import sha256 from "crypto-js/sha256"

function response(statusCode: number, body: any) {
  return { statusCode, body: JSON.stringify(body) }
}

// Hashing your password before saving is critical
// Hashing is one-way meaning you can never guess the password
// Adding a salt and the username guards against common passwords
function hashPassword(username: string, password: string) {
  return sha256(
    `${password}${process.env.SALT}${username}${password}`
  ).toString()
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

  // username is the key, which means it must be unique
  let user = await db.getItem({
    TableName: process.env.USER_TABLE!,
    Key: {
      username,
    },
  })

  if (!user) {
    // user was not found, create
    user = await db.updateItem({
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
  } else {
    // check credentials
  }

  return response(200, user)
}
