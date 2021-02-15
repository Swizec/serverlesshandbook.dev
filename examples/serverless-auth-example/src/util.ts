import sha256 from "crypto-js/sha256"

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
