import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";
import kakaoImg from "./kakao.svg";

const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  border: 3px solid #eee;
  padding: 40px 20px;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  ${Input} {
    margin-bottom: 16px;
  }
  ${Button} {
    width: 100%;
    margin: 8px 0;
    img {
      width: 24px;
      height: 24px;
    }
  }
  /* div {
    width: 400px;
    color: #eee;
  } */
  /* h1 {
    font-weight: 700;
  } */
`;
const Logo = styled.h1`
  font-family: pretendard;
  text-align: center;
  font-size: 40px;
  background-image: linear-gradient(135deg, aqua, purple);
  background-clip: text;
  color: transparent;
`;
const Description = styled.div`
  color: #848187;
  text-align: center;
`;
const Label = styled.label`
  color: #e1c6f7;
`;
function Login(props) {
  return (
    <Container>
      <Logo>DW 온라인 스쿨</Logo>
      <Description>
        회원이 아니신가요? <Link>회원가입 하기</Link>
      </Description>
      <form>
        <Label htmlFor="email">이메일</Label>
        <Input type="email" id="email" placeholder="wjddmsy1@naver.com" />
        <Label htmlFor="password">비밀번호</Label>
        <Input type="password" id="password" placeholder="비밀번호" />
      </form>
      <Button $Color>로그인 하기</Button>
      <Button>
        <img src={kakaoImg} /> 카카오 로그인
      </Button>
    </Container>
  );
}

export default Login;
