import React, { useState, useRef, useLayoutEffect } from "react"
import { Global } from "@emotion/core"
import { Box, Flex } from "rebass"
import { Sidenav, Pagination } from "@theme-ui/sidenav"
import { 
    EditLink,
    Footer,
    Head,
    Header,
    Reactions,
    SkipLink
} from "@swizec/gatsby-theme-course-platform"
import Nav from "./nav"
import { default as PaywallCopy } from "../../../components/paywall"
import QuickThanks from "../../../components/quickthanks"

const Paywall = ({ page }) => {
  const copyDiv = useRef(null)

  const updateLockedContent = () => {
    if (typeof window !== "undefined") {
      let children = document.getElementById("content").children

      let isLocked = false
      for (let child of children) {
        if (child.id === "lock") isLocked = true
        if (isLocked === true) {
          child.style.display = "none"
        }
      }
    }
  }

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        if (
          window.localStorage.getItem("unlock_handbook") &&
          window.localStorage.getItem("sale_id")
        ) {
          copyDiv.current.style = `display: none`
        } else {
          updateLockedContent()

          const overlay =
            typeof window !== "undefined" && document.createElement("div")
          const main =
            typeof window !== "undefined" &&
            document.querySelector("main#content")

          const style = `
          background-image: linear-gradient(rgba(255, 255, 255, 0) 60%,  rgb(255, 255, 255, 1) 100%);
          width: 100%;
          top: 0px;
          bottom: 0px;
          position: absolute;
        `
          overlay.style = style

          main.style = "position: relative;"
          main.appendChild(overlay)

          const dimensions = main.getBoundingClientRect()

          copyDiv.current.style = `
          top: ${Math.round(dimensions.height * 0.2)}px;
          width: ${Math.round(dimensions.width)}px;
          background-color: var(--theme-ui-colors-muted,#f6f6ff);
        `
        }
      })
    }
  }, [page])

  return (
    <Box id="paywall-copy" ref={copyDiv}>
      <PaywallCopy />
    </Box>
  )
}

const Sidebar = (props) => {
  const showPaywall =
    typeof window !== "undefined" &&
    (!window.localStorage.getItem("unlock_handbook") ||
      !window.localStorage.getItem("sale_id"))


  return (
    <Flex
      sx={{
        pt: 64
      }}>
      <Box
        as={Sidenav}
        ref={props.nav}
        open={props.open}
        onClick={(e) => {
          props.setMenu(false)
        }}
        onBlur={(e) => {
          props.setMenu(false)
        }}
        onFocus={(e) => {
          props.setMenu(true)
        }}
        sx={{
          width: [256, 256, 320],
          flex: "none",
          px: 3,
          mt: [64, 0],
          "ul": {
            p: 0,
            m: 0
          },
          "ul > li": {
            mb: 0,
          },
          "ul > li > a": {
            p: '8px',
          },
          maxHeight: '100vh !important',
          overflowY: 'scroll',
          height: '100%'
        }}
      >
        <Nav />
      </Box>
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: 768,
          minHeight: "calc(100vh - 64px)",
          mx: "auto",
          px: [3, 4],
          pb: 5,
        }}
      >
        {props.children}
        {showPaywall === false && <Reactions page={props.uri} />}
        {showPaywall ? (
          <Paywall page={props.location.pathname} />
        ) : (
          <QuickThanks />
        )}
        <Nav
          pathname={props.location.pathname}
          components={{
            wrapper: Pagination,
          }}
        />
      </Box>
    </Flex>
  )
}

export default (props) => {
  const fullwidth = props.location.pathname === "/"
  const [menu, setMenu] = useState(false)
  const nav = useRef(null)

  return (
    <Box
      sx={{
        variant: "styles.root",
      }}
    >
      <SkipLink />
      <Global
        styles={{
          body: { margin: 0 },
        }}
      />
      <Header siteTitle="Serverless Handbook" courseFirstLesson={props.courseFirstLesson} showMenu={false} fullwidth={fullwidth} menu={menu} setMenu={setMenu} nav={nav} />
      {!fullwidth ? (
        <Sidebar {...props} nav={nav} open={menu} setMenu={setMenu}>
          <main id="content">{props.children}</main>
        </Sidebar>
      ) : (
        <>
          <Head {...props} />
          <main id="content">{props.children}</main>
        </>
      )}
      <Footer />
    </Box>
  )
}
