import { APIGatewayEvent } from "aws-lambda"
import * as db from "simple-dynamodb"
import omit from "lodash.omit"
import * as jwt from "jsonwebtoken"
import { response, hashPassword } from "./util"

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

async function findUser(username: string) {
  const result = await db.getItem({
    TableName: process.env.USER_TABLE!,
    Key: {
      // username is the key, which means it must be unique
      username,
    },
  })

  return result.Item
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
  let user = await findUser(username)

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
  const token = jwt.sign(omit(user, "password"), process.env.SUPER_SECRET!)

  return response(200, {
    user: omit(user, "password"),
    token,
  })
}

// Verifies you have a valid JWT token
export const verify = async (event: APIGatewayEvent) => {
  const { token } = JSON.parse(event.body || "{}")

  if (!token) {
    return response(400, {
      status: "error",
      error: "Please provide a token to verify",
    })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    return response(200, { status: "valid" })
  } catch (err) {
    return response(401, err)
  }
}
