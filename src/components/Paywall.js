import React, { useRef, useEffect } from "react"
import ReactDOMServer from "react-dom/server"
import { useAuth } from "react-use-auth"
import { Box } from "theme-ui"
import { wrapRootElement } from "gatsby-plugin-theme-ui/gatsby-browser"

import { default as PaywallCopy } from "../components/paywall-copy"
import QuickThanks from "./quickthanks"
import { useLocalStorage } from "./useLocalStorage"

function toggleLockedContent(show) {
  if (typeof window !== "undefined") {
    let children = document.getElementById("content").children

    let isLocked = false
    for (let child of children) {
      if (child.id === "lock") isLocked = true
      if (isLocked === true) {
        child.style.display = show ? "block" : "none"
      }
    }
  }
}

function hidePaywall(paywallDiv) {
  if (paywallDiv.current) {
    paywallDiv.current.style = `display: none`
  }

  const overlays =
    typeof window !== "undefined" &&
    document.querySelectorAll(".fadeout-overlay")

  if (overlays) {
    for (let overlay of overlays) {
      overlay.style = "display: none"
    }
  }

  // show content
  toggleLockedContent(true)
}

function showPaywall(paywallDiv) {
  // hide content
  toggleLockedContent(false)

  const overlay = typeof window !== "undefined" && document.createElement("div")
  const main =
    typeof window !== "undefined" && document.querySelector("main#content")

  const style = `
            background-image: linear-gradient(rgba(255, 255, 255, 0) 80%,  rgb(255, 255, 255, 1) 100%);
            width: 100%;
            top: 0px;
            bottom: 0px;
            position: absolute;
          `
  overlay.style = style
  overlay.className = "fadeout-overlay"

  main.style = "position: relative;"
  main.appendChild(overlay)

  const dimensions = main.getBoundingClientRect()

  if (paywallDiv.current) {
    paywallDiv.current.style = `
            top: ${Math.round(dimensions.height * 0.1)}px;
            width: ${Math.round(dimensions.width)}px;
            background-color: var(--theme-ui-colors-muted,#f6f6ff);
          `
  }
}

const LOCKED_PAGES = [
  "/getting-started",
  "/serverless-pros-cons",
  "/serverless-flavors",
  "/serverless-dx",
  "/serverless-architecture-principles",
  "/serverless-elements",
  "/robust-backend-design",
  "/databases",
  "/serverless-rest-api",
  "/serverless-graphql",
  "/lambda-pipelines",
  "/serverless-monitoring",
  "/dev-qa-prod",
  "/serverless-performance",
  "/serverless-chrome-puppeteer",
  "/handling-secrets",
  "/serverless-authentication",
  "/glossary",
  "/appendix-more-databases",
  "/downloads",
]

export function usePaywall(pagePath) {
  const paywallDiv = useRef(null)
  const { isAuthorized } = useAuth()
  const [unlockHandbook] = useLocalStorage("unlock_handbook")
  const [saleId] = useLocalStorage("sale_id")
  const [unlockedPages, setUnlockedPages] = useLocalStorage(
    "unlocked_pages",
    []
  )
  const hasLock = LOCKED_PAGES.includes(pagePath.replace(/\/$/, ""))

  const unlocked =
    !hasLock ||
    (pagePath &&
      unlockedPages.filter((p) => p !== "/downloads").includes(pagePath)) ||
    isAuthorized(["ServerlessHandbook"]) ||
    (unlockHandbook && saleId)

  useEffect(() => {
    // doesn't run during on-page navigation for some reason
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        if (unlocked) {
          hidePaywall(paywallDiv)
        } else {
          showPaywall(paywallDiv)
        }
      })
    }
  }, [unlocked])

  function unlockCurrentPage() {
    setUnlockedPages((unlockedPages) => [...unlockedPages, pagePath])
  }

  return { unlocked, paywallDiv, unlockCurrentPage, SnipContent }
}

export function SnipContent({ children }) {
  const html = ReactDOMServer.renderToString(children).split(
    '<div id="lock"></div>'
  )[0]

  //   return wrapRootElement({
  //     element: children,
  //   })

  //   return wrapRootElement({
  //     element: <div dangerouslySetInnerHTML={{ __html: html }} />,
  //   })

  return <div dangerouslySetInnerHTML={{ __html: html }} />

  //   return (
  //     <WrapRootElement
  //       element={<div dangerouslySetInnerHTML={{ __html: html }} />}
  //     />
  //   )
}

export const Paywall = ({ pagePath }) => {
  const { unlocked, paywallDiv, unlockCurrentPage } = usePaywall(pagePath)

  if (unlocked) {
    return <QuickThanks />
  } else {
    return (
      <Box id="paywall-copy" ref={paywallDiv}>
        <PaywallCopy unlockCurrentPage={unlockCurrentPage} />
      </Box>
    )
  }
}
