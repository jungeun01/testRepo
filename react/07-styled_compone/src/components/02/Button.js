import React from "react";
import { styled } from "styled-components";
import nailImg from "./nail.png";

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const StyledButton = styled.button`
  background-color: #6750a4;
  border: none;
  color: #fff;
  padding: 16px;

  & ${Icon} {
    margin-right: 4px;
  }
  &:hover {
    ${Icon} {
      opacity: 0.2;
    }
  }
`;

function Button({ children }) {
  return (
    <StyledButton>
      <Icon src={nailImg} />
      {children}
    </StyledButton>
  );
}

export default Button;
