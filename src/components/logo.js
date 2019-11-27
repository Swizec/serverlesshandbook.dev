import React from "react"
import styled from "@emotion/styled"
import { layout } from "styled-system"

const Svg = styled(({ width, height, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} />
))`
  transform: rotate3d(1, 1, 1, 0deg);
  ${layout}
`


const Logo = props => {

  return (
    <Svg
      viewBox="0 0 64 64"
      style={{
        display: "block",
        maxWidth: "100%",
        margin: 0,
        fill: "none",
        stroke: "cyan",
      }}
      vectorEffect="non-scaling-stroke"
      width={props.size}
      height={props.size}
    ></Svg>
  )
}

Logo.defaultProps = {
  initial: false,
  color: "white",
  bg: "transparent",
  strokeWidth: 2,
  size: 256,
}

export default Logo