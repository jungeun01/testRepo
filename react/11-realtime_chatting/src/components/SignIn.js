import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import * as FcIcons from "react-icons/fc";
// import "./App.css";

function SignIn({ auth, login }) {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider); //구글 로그인 팝업창
  };
  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        <FcIcons.FcGoogle />
        <span>
          <b>구글로 로그인하기</b>
        </span>
      </button>
      <span className="notice">
        😼아이폰(ios)은 safari, chrome
        <br />
        등으로 로그인 해주세요.
      </span>
    </>
  );
}

export default SignIn;
