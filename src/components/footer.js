import React from "react"
import { Box, Flex, Link } from "rebass"

export default props => (
  <Box as="footer" py={5} color="background" bg="text">
    <Box
      sx={{
        maxWidth: "wide",
        mx: "auto",
        px: 3,
      }}
    >
      Built by{" "}
      <a href="https://swizec.com" style={{ color: "white" }}>
        Swizec
      </a>{" "}
      with ❤️
      <Link href="/" variant="nav">
        Serverless Handbook
      </Link>
      <Link href="https://github.com/Swizec/serverless-handbook" variant="nav">
        GitHub
      </Link>
    </Box>
  </Box>
)
