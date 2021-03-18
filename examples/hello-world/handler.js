exports.hello = async (event) => {
  const { name } = event.queryStringParameters

  return {
    statusCode: 200,
    body: `Hello ${name} 👋`,
  }
}
