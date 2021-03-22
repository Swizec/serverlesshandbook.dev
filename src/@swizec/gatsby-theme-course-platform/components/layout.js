import React, { useState, useRef } from "react"
import { Global } from "@emotion/core"
import { Box, Flex } from "theme-ui"
import { Sidenav, Pagination } from "@theme-ui/sidenav"
import {
  Footer,
  Head,
  Header,
  Reactions,
} from "@swizec/gatsby-theme-course-platform"
import Nav from "./nav"
import { Paywall, usePaywall } from "../../../components/Paywall"

const Sidebar = (props) => {
  const { unlocked: contentUnlocked } = usePaywall(props.location.pathname)

  return (
    <Flex
      sx={{
        pt: 64,
      }}
    >
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
          ul: {
            p: 0,
            m: 0,
          },
          "ul > li": {
            mb: 0,
          },
          "ul > li > a": {
            p: "8px",
          },
          maxHeight: "100vh !important",
          overflowY: "scroll",
          height: "100%",
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
        {contentUnlocked ? <Reactions page={props.href} /> : null}
        <Paywall page={props.location.pathname} />
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

  if (props.pageContext.frontmatter) {
    props = {
      ...props,
      ...props.pageContext.frontmatter,
    }
  }

  return (
    <Box
      sx={{
        variant: "styles.root",
      }}
    >
      <Global
        styles={{
          body: { margin: 0 },
        }}
      />
      <Header
        siteTitle="Serverless Handbook"
        courseFirstLesson={props.courseFirstLesson}
        showMenu={false}
        fullwidth={fullwidth}
        menu={menu}
        setMenu={setMenu}
        nav={nav}
      />
      {!fullwidth ? (
        <Sidebar {...props} nav={nav} open={menu} setMenu={setMenu}>
          <Head {...props} />
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
