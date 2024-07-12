import React from "react";
import TermsOfService from "./TermsOfService";
import Button from "./Button";
import styled from "styled-components";

const StyledTermsOfService = styled(TermsOfService)`
  background-color: #ededed;
  width: 400px;
  padding: 16px;
  margin: 40px auto;
  border-radius: 8px;
`;

const SubmitButton = styled(Button)`
  background-color: #de117d;
  margin: 0 auto;
  width: 200px;
  border-radius: 10px;
  display: block;
  &:hover {
    background-color: #f5070f;
  }
`;

function Inheritance(props) {
  return (
    <div>
      <StyledTermsOfService />
      <SubmitButton>계속하기</SubmitButton>
    </div>
  );
}

export default Inheritance;
