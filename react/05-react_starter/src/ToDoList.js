import React, { useState } from "react";
// import ToDoList from "./ToDoList";

function ToDoList(props) {
  // input 에 변화가 있을때 마다 콘솔에 찍어보기==>값을 가지고 있어야한다.
  //   ==>관리를 해야한다.==>state 로 만들어야한다

  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const handleChange = (e) => {
    setToDo(e.target.value);
    // console.log(e.target.value);
  };

  // 버튼 클릭했을 떄(form태그 안에 있으니 submit이벤트로)화면에 나오도록 해야한다.
  // 화면에 나오는 todoList 는 계속 추가가 되어야한다.==>배열

  const handleSubmit = (e) => {
    e.preventDefault(); //preventDefault=기본submit 이벤트 막는다.
    if (toDo === "") return false;
    setToDoList([...toDoList, toDo]);
    setToDo("");
  };
  //   배열의 원소 갯수만큼 화면에 렌더링 되어야 한다.
  // 배열의 원소 갯수만큼 숫자가 표시되어야한다.

  return (
    <div>
      <h1>My To Do({toDoList.length})</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={toDo} />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul className="ToDoList">
        {/* {toDoList.map((item, index) => {
          return <li key={index}>{item}</li>;
        })} */}
        {/* 같은거 그리고 반복문해서 랜더링 할시  key값을 쓴다. */}
        {toDoList.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
        {/* <li>.</li>
        <li>todo2</li>
        <li>todo3</li> */}
      </ul>
    </div>
  );
}

export default ToDoList;
