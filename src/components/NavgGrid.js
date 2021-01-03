import React from "react"
import { Box } from "theme-ui"

export const NavGrid = (props) => (
  <Box
    {...props}
    sx={{
      fontFamily: "heading",
      ul: {
        listStyle: "none",
        p: 0,
        display: "grid",
        gridGap: 3,
        gridTemplateRows: [`repeat(9, 1fr)`, `repeat(5, 1fr)`],
        gridTemplateColumns: ["repeat(2, 1fr)", "repeat(3, 1fr)"],
        gridAutoFlow: ["dense", "column"],
        counterReset: "nav-grid",
      },
      li: {
        fontWeight: "bold",
        fontSize: [1, 2, 2],
        counterIncrement: "nav-grid",
        mb: 0,
        "::before": {
          content: "counter(nav-grid)",
          display: "inline-block",
          pr: 1,
        },
      },
      a: {
        color: "inherit",
        textDecoration: "none",
        transition: "color .2s ease-out",
        ":hover,:focus": {
          color: "primary",
        },
      },
    }}
  />
)
