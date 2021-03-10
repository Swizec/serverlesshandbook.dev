import React from "react"
import { NavLink } from "theme-ui"

const HeaderLogo = ({ siteTitle, logo }) => {
  return (
    <NavLink
      variant="nav"
      href="/"
      sx={{
        width: "100%",
        maxWidth: 220,
        alignItems: "center",
        pl: [0, 2, 2],
      }}
    >
      <p>{siteTitle}</p>
    </NavLink>
  )
}

export default HeaderLogo
