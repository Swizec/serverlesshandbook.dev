import baseTheme from "@swizec/gatsby-theme-course-platform/src/gatsby-plugin-theme-ui"
import merge from "lodash.merge"
import { toTheme } from "@theme-ui/typography"
import typography from "typography-theme-stow-lake"
import "typeface-neuton"
import "typeface-lato"

export default merge(baseTheme, toTheme(typography))
// export default toTheme(typography)
