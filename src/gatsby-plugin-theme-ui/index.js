import { future } from "@theme-ui/presets"
import merge from "lodash.merge"
import { toTheme } from "@theme-ui/typography"
import typography from "typography-theme-stow-lake"
import amazonBuy from "../images/buy-now-amazon.png"
import "typeface-neuton"
import "typeface-lato"

import { courseTheme } from "@swizec/gatsby-theme-course-platform"

const theme = merge(
  future,
  {
    buttons: {
      buy: {
        cursor: "pointer",
        fontWeight: "heading",
        background: `url(${amazonBuy})`,
        backgroundSize: "fit",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        textIndent: "-1000%",
        width: 240,
      },
    },
  },
  toTheme(typography),
  courseTheme
)

export default theme
