import React from "react";
import Button from "./Button";
import Wrapper from "./Wrapper";
import BoxOne from "./BoxOne";
import BoxTwo from "./BoxTwo";
import Box from "./Box";
import Circle from "./Circle";
import Input from "./Input";

function HelloStyled(props) {
  return (
    <div>
      <Button>Hello Styled!!</Button>
      <Wrapper>
        <Box bgColor="#cf6a87">
          <span>🤍</span>
        </Box>

        <Box as="button" bgColor="#574B90" />
        <Circle bgColor="blue" />
      </Wrapper>
      <form>
        <Wrapper>
          <Input />
          <Input />
          <Input />
          <input />
          <Button>제출</Button>
        </Wrapper>
      </form>
      <Wrapper>
        <Circle bgColor="yellow" />
      </Wrapper>
    </div>
  );
}
// 스타일이 똑같은속성을 바꾸고 싶으면 as함수 사용.
export default HelloStyled;
