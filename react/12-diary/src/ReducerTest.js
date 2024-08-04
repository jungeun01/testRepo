import { useReducer, useState } from "react";

//리듀서 함수를 쓸때 switch 사용.
function reducer(state, action) {
  switch (action.type) {
    case "PLUS":
      return { count: state.count + 1 };
    case "MINUS":
      return { count: state.count - 1 };

    default:
      return state;
  }
}

const initialState = { count: 0 }; //state의 초기값
// 리듀서 함수를 왜쓰지?------------->
// 예측 가능 :상태 변경이 예측 가능하고 일관성 있게 이루어진다.
// 중앙 집중화된 관리: 여러 상태를 하나의 리듀서에서 관리를 하거나, 여러 리듀서를 조합하여
// 관리를 할 수 있다. 모든 상태의 변경이 하나의 통로(dispatch 를 통한 액션 전달)
// 상태관리의 복잡성이 줄어들고, 상태 변경이 어디에서 이루어지는지를 쉽게 추적할 수 있다.
function ReducerTest() {
  const [state, dispatch] = useReducer(reducer, initialState); //(리듀서 함수,state의 초기값)을 넣어준다.
  //  dispatch 함수 중요=>

  // STATE를 사용하여 만든함수.
  // const [count, setCount] = useState(0); //상태. 화면과 연결
  // const handlePlus = () => {
  //   // count를 +1 한 후에 App 컴포넌트 (코드) 재실행(재랜더링)
  //   setCount(count + 1);
  // };
  // const handleMinus = () => {
  //   setCount(count - 1);
  // };

  return (
    <div className="App">
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "PLUS" })}>plus</button>
      <button onClick={() => dispatch({ type: "MINUS" })}>minus</button>
    </div>
  );
}
// 1. app 컴포넌트 최초 렌더링시
// state 선언부 실행1번
// handlePlus 함수 생성 1번
// return실행  1번

// 2.플러스 버튼 클릭 첫번째
// state선언부 실행 안됨 ---state가 실행되려면 index.js안에있는 app컴포넌트를 한번더 실행해야함?!
//handlePlus 함수 실행
// return 실행 안됨 ......
export default ReducerTest;
