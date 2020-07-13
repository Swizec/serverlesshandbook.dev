import React from "react"
import { Box, Link } from "rebass"

export default (props) => (
  <Box as="footer" py={5} color="background" bg="text">
    <Box
      sx={{
        maxWidth: "wide",
        mx: "auto",
        px: 3,
      }}
    >
      Built by
      <Link
        href="https://swizec.com"
        variant="nav"
        style={{ textDecoration: "underline" }}
      >
        Swizec
      </Link>
      with ❤️
      <Link href="/" variant="nav">
        Serverless Handbook
      </Link>
      <Link
        href="https://github.com/Swizec/serverlesshandbook.dev"
        variant="nav"
      >
        GitHub
      </Link>
    </Box>
  </Box>
)
