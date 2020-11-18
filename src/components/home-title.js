import React from "react"
import { Box, Flex, Heading, Text } from "rebass"
import { GumroadButton } from "@swizec/gatsby-theme-course-platform"
import * as coverImg from "../images/cover.svg"

const HomeTitle = () => (
  <Flex flexWrap="wrap">
    <Box
      sx={{
        p: 3,
        minWidth: 250,
        flex: 1,
        textAlign: "center",
        margin: "auto auto",
      }}
    >
      <Heading fontSize={6}>
        Serverless Handbook
        <Text fontSize={4}>for frontend engineers</Text>
      </Heading>
      <Text>Learn everything you need to dive into the modern backend</Text>

      <Box mt={10}>
        <GumroadButton>
          <a
            className="gumroad-button"
            href="https://gum.co/qdNn?wanted=true"
            data-gumroad-single-product="true"
            target="_blank"
            rel="noopener noreferrer"
          >{`start learning for $0+`}</a>
        </GumroadButton>
      </Box>
    </Box>

    <Box sx={{ p: 3, minWidth: 250, flex: 1, textAlign: "center" }}>
      <img
        src={coverImg}
        alt="Serverless Handbook Cover"
        style={{ margin: "auto auto", maxWidth: "450px" }}
      />
    </Box>
  </Flex>
)

export default HomeTitle
