import React from "react"
import { useAuth } from "react-use-auth"
import { Heading, Flex, Box, Text } from "theme-ui"
import { GumroadButton, TinyFormCK } from "@swizec/gatsby-theme-course-platform"
// import * as coverImg from "../images/cover.svg"
import * as coverImg from "../images/cover.png"

export const ChapterHeading = ({ sx }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated()) {
    return <Heading sx={sx}>Chapters</Heading>
  } else {
    return <Heading sx={sx}>Preview Chapters</Heading>
  }
}

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

export const HomeTitle = () => (
  <Flex sx={{ flexWrap: "wrap" }}>
    <Box
      sx={{
        p: 3,
        minWidth: 250,
        flex: 1,
        textAlign: "center",
        margin: "auto auto",
      }}
    >
      <Heading sx={{ fontSize: 6 }}>
        Serverless Handbook
        <Text sx={{ fontSize: 4 }}>for frontend engineers</Text>
      </Heading>
      <Text>Dive into modern backend. Understand any backend</Text>

      <Heading sx={{ fontSize: 3, pt: 1 }}>
        <em>Available wherever books are sold, Mar 31st</em>
      </Heading>

      <Box
        sx={{
          p: 3,
          minWidth: 250,
          flex: 1,
          textAlign: "center",
          display: ["block", "none"],
        }}
      >
        <img
          src={coverImg}
          alt="Serverless Handbook Cover"
          style={{ margin: "auto auto", maxWidth: "650px", width: "100%" }}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <TinyFormCK copyBefore="" submitText="Send it to me! 💌">
          <Heading sx={{ fontSize: 4, pt: 2 }}>Get your free chapter!</Heading>
          <p>
            Wanna see what’s in Serverless Handbook, but not ready to buy the
            full book? Start with a free chapter.
          </p>
        </TinyFormCK>
      </Box>

      {/* <Box sx={{ mt: 10 }}>
        <GumroadButton>
          <a
            className="gumroad-button"
            href="https://gum.co/NsUlA"
            data-gumroad-single-product="true"
            target="_blank"
            rel="noopener noreferrer"
          >{`Get Serverless Handbook`}</a>
        </GumroadButton>
      </Box> */}
    </Box>

    <Box
      sx={{
        p: 3,
        minWidth: 250,
        flex: 1,
        textAlign: "center",
        display: ["none", "block"],
      }}
    >
      <img
        src={coverImg}
        alt="Serverless Handbook Cover"
        style={{ margin: "auto auto", maxWidth: "650px", width: "100%" }}
      />
    </Box>
  </Flex>
)
