import React, { useState } from "react";

function State(props) {
  const [state, setState] = useState(0);
  const onClickHandler = () => {
    console.log("click!!");

    setState(1);
    if (state === 1) {
      console.log("실행되니?");
    }
  };
  return <h1 onClick={onClickHandler}>State테스트</h1>;
}

export default State;
