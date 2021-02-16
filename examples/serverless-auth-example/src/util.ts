import { APIGatewayEvent } from "aws-lambda"
import sha256 from "crypto-js/sha256"
import * as jwt from "jsonwebtoken"

export function response(statusCode: number, body: any) {
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
export function hashPassword(username: string, password: string) {
  return sha256(
    `${password}${process.env.SALT}${username}${password}`
  ).toString()
}

export type User = { username: string; createdAt: string }

// Used to verify a request is authenticated
export function checkAuth(event: APIGatewayEvent): boolean | User {
  const bearer = event.headers["Authorization"]

  if (bearer) {
    try {
      const decoded = jwt.verify(
        // Bearer prefix from Authorization header
        bearer.replace(/^Bearer /, ""),
        process.env.JWT_SECRET!
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
