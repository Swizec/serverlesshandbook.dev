import React, { useState, useRef, useLayoutEffect } from "react"
import { Global } from "@emotion/core"
import { Box, Flex } from "rebass"
import { Sidenav, Pagination } from "@theme-ui/sidenav"
import Head from "./head"
import SkipLink from "./skip-link"
import Header from "./header"
import Footer from "./footer"
import Nav from "./nav"
import EditLink from "./edit-link"
import { default as PaywallCopy } from "./paywall"
import QuickThanks from "./quickthanks"

import Reactions from './reactions'


const Paywall = ({ floating }) => {
  const copyDiv = useRef(null)

  useLayoutEffect((floating) => {
    if (typeof window !== "undefined" && floating) {

      if (
        !window.localStorage.getItem("unlock_handbook") ||
        !window.localStorage.getItem("sale_id")
      ) {
        const children = [].slice.call(document.getElementById('content').children);
     
        let isLocked = false;
        for (const child of children) {
          if (child.id === 'lock') isLocked = true;
          if (isLocked === true ) {
            child.style.display = 'none';
          }
        }
      }

      window.requestAnimationFrame(() => {
        const overlay = document.createElement("div")
        const main = document.querySelector("main#content")

        const style = `
          background-image: linear-gradient(rgba(2, 0, 36, 0) 0%,  rgb(255, 255, 255, 0.99) 100%);
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
          position: absolute;
          top: ${Math.round(dimensions.height * 0.2)}px;
          width: ${Math.round(dimensions.width)}px;
          ${document !== undefined && document.body.scrollHeight < 4000 && 'display: none' }
      `
      })
    }
  }, [floating])

  return (
    <Box id="paywall-copy" ref={copyDiv}>
      <PaywallCopy />
    </Box>
  )
}

const Sidebar = props => {
  const showPaywall =
    typeof window !== "undefined" &&
    (!window.localStorage.getItem("unlock_handbook") ||
      !window.localStorage.getItem("sale_id"))

  return (
    <Flex>
      <Box
        as={Sidenav}
        ref={props.nav}
        open={props.open}
        onClick={e => {
          props.setMenu(false)
        }}
        onBlur={e => {
          props.setMenu(false)
        }}
        onFocus={e => {
          props.setMenu(true)
        }}
        sx={{
          width: [256, 256, 320],
          flex: "none",
          px: 3,
          mt: [64, 0],
          pb: 3,
          "li > ul > li > a": {
            pl: "24px",
          },
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
        {showPaywall ? (
          <>
            <Paywall floating />
            <Paywall />
          </>
        ) : (
          <QuickThanks />
        )}
        <EditLink my={5}>Edit this page on GitHub</EditLink>
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

export default props => {
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
      <Head {...props} />
      <Header fullwidth={fullwidth} menu={menu} setMenu={setMenu} nav={nav} />
      {!fullwidth ? (
        <Sidebar {...props} nav={nav} open={menu} setMenu={setMenu}>
          <main id="content">{props.children}</main>
          <Reactions />
        </Sidebar>
      ) : (
        <main id="content">{props.children}</main>
      )}
      <Footer />
    </Box>
  )
}
