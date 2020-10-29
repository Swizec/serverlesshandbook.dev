import React from "react"
import { Box, Flex } from "rebass"
import {GumroadButton} from "course-platform"
import * as coverImg from '../images/cover.svg'

const HomeTitle = () => (
 <Flex flexWrap='wrap' sx={{textAlign: 'center', margin: 'auto auto'}}>
  <Box
    p={3}
    width={1/2}
    sx={{
      minWidth: '250px',
      margin: 'auto auto'
    }}
  >
    <Box sx={{ textAlign: "center", }} >
      <h1 style={{fontSize: '2em'}}>
        Serverless Handbook <br /><small style={{fontSize: '0.5em'}}>for frontend engineers</small>
      </h1>
      Secretly this is going to be a resource teaching frontend engineers everything they need to know to dive into backend
    </Box>

    <Box sx={{marginTop: '10px'}}>
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

  <Box
    p={3}
    width={1/2}
    sx={{
      minWidth: '250px',
      margin: 'auto auto'
    }}
  >
    <img src={coverImg} alt="Serverless Handbook Cover" />
  </Box>
</Flex>
)

export default HomeTitle