import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  // 버튼 클릭 시 숫자 올라감
  const handleClick = () => {
    console.log("App 컴포넌트 렌더링..");
    setCount(count + 1);
  };

  // input
  const handleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  useEffect(() => {
    console.log("나는 화면이 최초 렌더링될 떄 실행되는 uef야.");
  }, []); // [](디펜더시 리스트) 안에는 react 가 무엇을 지켜볼 지 작성해준다.
  useEffect(() => {
    console.log("나는 count가 변경될 때 실행되는 uef 야");
  }, [count]);
  useEffect(() => {
    console.log("나는 inputValue가 변경될 때 실행되는 uef 야");
  }, [title]);

  // input안에 text가바뀔때 마다 확인=onChange

  return (
    <div>
      <input type="text" placeholder="Search here" onChange={handleChange} />
      <h2>입력한 값:{title}</h2>
      <h1>{count}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
