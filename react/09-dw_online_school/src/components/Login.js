import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import LoginButton from "./LoginButton";
import KakaoButton from "./KakaoButton";
import { getMember } from "../api/firebase";

const LoginContainer = styled.div`
  width: 400px;
  margin: 40px auto;

  ${LoginButton} {
    width: 100%;
    margin: 8px 0;
  }

  ${Input} {
    margin-bottom: 16px;
  }
`;

const Logo = styled.h1`
  font-family: Pretendard;
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
  const { state } = useLocation(); //로그인하고 이동시킬경로

  const navigate = useNavigate();
  // 사용자가 작성할 초기값 로그인
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    // 기본 submit 이벤트를 막는다.
    e.preventDefault();
    // 파이어베이스 접근해서 사용자가 입력한 이메일을 가진 member를 조회한다.
    const { memberObj, message } = await getMember(values);
    // debugger; 객체에서 빼올때는 key값 배열은 length
    if (Object.keys(memberObj).length === 0) {
      // 로그인 실패
      alert(message);
    } else {
      // 로그인 성공
      localStorage.setItem("member", JSON.stringify(memberObj));
      alert(message);
      // 로그인 성공후 메인페이지로 이동 후 replace 사용하여 뒤로 가기했을때 다시 로그인
      // 페이지로 이동못하게 넣어준다.
      navigate(state ? state : { replace: true });
    }
  };

  return (
    <LoginContainer>
      <Logo>DW 온라인스쿨</Logo>
      <Description>
        회원이 아니신가요? <Link>회원가입 하기</Link>
      </Description>
      <form onSubmit={handleLogin}>
        <Label htmlFor="email">이메일</Label>
        <Input
          type="email"
          id="email"
          placeholder="styled@naver.com"
          onChange={handleChange}
          name="email"
        />
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          placeholder="비밀번호"
          onChange={handleChange}
          name="password"
        />
        <LoginButton>로그인 하기</LoginButton>
      </form>
      <KakaoButton>카카오 로그인</KakaoButton>
    </LoginContainer>
  );
}

export default Login;
