import React from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core"
import { useThemeUI } from "theme-ui"
import { layout } from "styled-system"

const Svg = styled(({ width, height, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} />
))`
  transform: rotate3d(1, 1, 1, 0deg);
  ${layout}
`

const spin1 = keyframes`
  50% { transform: rotate3d(0, 2, 1, 180deg) }
  100% { transform: rotate3d(0, 2, 1, 360deg) }
`
const spin2 = keyframes`
  50% { transform: rotate3d(2, 0, 1, 180deg) }
  100% { transform: rotate3d(2, 0, 1, 360deg) }
`

const fade1 = keyframes`
  0% { stroke: magenta }
  33% { stroke: cyan }
  66% { stroke: yellow }
  100% { stroke: magenta }
`

const a = "4s"
const b = "7s"
const c = "8s"

const Electron1 = styled("circle")`
  transform-origin: 50% 50%;
  animation-name: ${spin1}, ${fade1};
  animation-duration: ${a}, ${b};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`

const Electron2 = styled("circle")`
  transform-origin: 50% 50%;
  animation-name: ${spin2}, ${fade1};
  animation-duration: ${a}, ${c};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`

const ElectronStatic1 = styled("circle")`
  transform-origin: 50% 50%;
  transform: rotate3d(0, 2, 1, 190deg);
`

const ElectronStatic2 = styled("circle")`
  transform-origin: 50% 50%;
  transform: rotate3d(2, 0, 1, 190deg);
`

const Logo = props => {
  const electronProps = {
    cx: 32,
    cy: 32,
    r: 24,
    strokeWidth: props.strokeWidth,
    vectorEffect: "non-scaling-stroke",
  }

  const electrons = props.static ? (
    <g>
      <ElectronStatic1 {...electronProps} stroke="#f90" />
      <ElectronStatic2 {...electronProps} stroke="magenta" />
    </g>
  ) : (
    <g>
      <Electron1 {...electronProps} />
      <Electron2 {...electronProps} />
    </g>
  )

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
