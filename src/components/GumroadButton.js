import React from "react"
import { Box, Button } from "rebass"

const GumroadButton = ({ children }) => {
  const showPaywall =
    typeof window !== "undefined" &&
    (!window.localStorage.getItem("unlock_handbook") ||
      !window.localStorage.getItem("sale_id"))

  return showPaywall ? (
    children
  ) : (
    <Box>
      <p>Thanks for your support <span role="img" aria-label="heart">❤</span></p>
      <Button as="a" href="/getting-started">
        Get Started
      </Button>
    </Box>
  )
}

export default GumroadButton
