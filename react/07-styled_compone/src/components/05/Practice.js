import React from "react";
import Input from "./Input";
import styled from "styled-components";

const Container = styled.div`
  ${Input} {
    margin: 10px;
  }
`;

export function Practice(props) {
  return (
    <Container>
      <h1>Size</h1>
      <Input size="small" />
      <Input size="medium" />
      <Input size="large" />
      <h1>Round</h1>
      <Input size="small" $round />
      <h1>Error</h1>
      <Input size="small" $error />
    </Container>
  );
}
