import { APIGatewayEvent } from "aws-lambda"
import * as jwt from "jsonwebtoken"
import { response } from "./util"

type User = { username: string; createdAt: string }

function checkAuth(event: APIGatewayEvent): boolean | User {
  const bearer = event.headers["Authorization"]

  if (bearer) {
    try {
      const decoded = jwt.verify(
        // Bearer prefix from Authorization header
        bearer.replace(/^Bearer /, ""),
        process.env.SUPER_SECRET!
      )

      // We saved user info in the token
      return decoded as User
    } catch (err) {
      return false
    }
  } else {
    return false
  }
}

export async function hello(event: APIGatewayEvent) {
  const authorized = checkAuth(event)

  if (authorized) {
    const user = authorized as User

    return response(200, {
      message: `Hello ${user.username}`,
    })
  } else {
    return response(401, {
      status: "error",
      error: "This is a private resource",
    })
  }
}
