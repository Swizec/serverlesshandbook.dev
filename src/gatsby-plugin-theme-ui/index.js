import { future } from "@theme-ui/presets"
import merge from "lodash.merge"
import { toTheme } from "@theme-ui/typography"
import typography from "typography-theme-stow-lake"
import "typeface-neuton"
import "typeface-lato"

import { courseTheme } from "@swizec/gatsby-theme-course-platform"

const theme = merge(future, toTheme(typography), courseTheme)

export default theme
