import React from 'react'
import styled from "@emotion/styled"

const Container = styled.div`
  text-align: center;
`;

const Img = styled.img`
  background-color: red;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: -40px;
`;

const Avatar = ({img}) => (
  <Container>
    <Img src={img} />
  </Container>
)

export default Avatar;