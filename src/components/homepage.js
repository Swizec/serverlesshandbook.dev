import React from "react"
import { useAuth } from "react-use-auth"
import { Heading, Flex, Box, Text, Button } from "theme-ui"
import { GumroadButton, TinyFormCK } from "@swizec/gatsby-theme-course-platform"
import { StaticImage } from "gatsby-plugin-image"

export const ChapterHeading = ({ sx }) => {
  const { isAuthorized } = useAuth()

  if (isAuthorized(["ServerlessHandbook"])) {
    return <Heading sx={sx}>Chapters</Heading>
  } else {
    return <Heading sx={sx}>Chapter Previews</Heading>
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

const CoverImage = () => {
  return (
    <a href="https://geni.us/serverless-handbook">
      <StaticImage
        src="../images/cover.png"
        alt="Serverless Handbook cover"
        loading="eager"
        objectFit="cover"
        objectPosition="50% 50%"
      />
    </a>
  )
}

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
        <Text sx={{ fontSize: 4, display: "block" }}>
          for frontend engineers
        </Text>
      </Heading>
      <Text>Dive into modern backend. Understand any backend</Text>

      <Box sx={{ my: 3 }}>
        <Flex sx={{ alignItems: "center", justifyContent: "center", mb: 1 }}>
          <Button
            variant="buy-shiny"
            as="a"
            sx={{ mr: 2 }}
            href="https://geni.us/serverless-handbook"
          >
            Buy now on Amazon
          </Button>
          <a
            className="gumroad-button"
            href="https://gum.co/NsUlA"
            data-gumroad-single-product="true"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Digital for $15
          </a>
        </Flex>
        <Text sx={{ fontSize: 0, display: "block" }}>
          #1 new release in Web Development
        </Text>
      </Box>

      <Box
        sx={{
          p: 3,
          minWidth: 250,
          flex: 1,
          textAlign: "center",
          display: ["block", "none"],
        }}
      >
        <CoverImage />
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
      <CoverImage />
    </Box>
  </Flex>
)
