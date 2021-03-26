import React, { useState } from "react"
import { Box, Button, Heading, Input, Label } from "theme-ui"

export const TestCloudFunction = ({
  serviceName,
  urlPlaceholder,
  jsonPlaceholder,
}) => {
  const [url, setUrl] = useState("")
  const [payload, setPayload] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState(null)

  async function runTest() {
    setError(null)
    setResult(null)

    if (!url) {
      setError(`Paste the URL you got from ${serviceName}`)
    } else {
      const corsUrl = `https://cors-anywhere.herokuapp.com/${url}`

      try {
        let res
        if (payload) {
          res = await fetch(corsUrl, {
            method: "POST",
            body: payload,
            headers: {
              "Content-Type": "application/json",
            },
          })
        } else {
          res = await fetch(corsUrl)
        }

        setResult(await res.text())
      } catch (e) {
        setError(e.message)
      }
    }
  }

  return (
    <Box bg="muted" p={[2, 3, 3]}>
      <Heading as="h3" mb={[1, 2, 2]}>
        Try your function
      </Heading>
      <p>Leave payload empty for GET requests, valid JSON for POST.</p>
      <Label>Target URL:</Label>
      <Input
        value={url}
        onChange={(ev) => setUrl(ev.target.value)}
        placeholder={urlPlaceholder}
      />
      <Label>JSON payload:</Label>
      <Input
        value={payload}
        onChange={(ev) => setPayload(ev.target.value)}
        placeholder={jsonPlaceholder}
      />
      <Button
        onClick={runTest}
        sx={{ mt: [1, 2, 2], mb: [2, 3, 3], cursor: "pointer" }}
      >
        Run {payload ? "POST" : "GET"} request
      </Button>
      {result ? (
        <>
          <Heading as="h4">Result:</Heading>
          <pre>{result}</pre>
        </>
      ) : null}
      {error ? (
        <>
          <Heading color="red" as="h4">
            Error:
          </Heading>
          <pre style={{ color: "red" }}>{error}</pre>
        </>
      ) : null}
    </Box>
  )
}
