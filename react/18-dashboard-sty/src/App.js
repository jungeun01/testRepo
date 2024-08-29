import "./App.css";

function App() {
  const big = ["과수", "사료", "수목"];
  const middle1 = ["과채류", "소과류", "중과류"];
  const middle2 = ["바보", "멍충", "퉤"];
  const middle3 = ["??", "하기싫", "ㅇㄴㄹ"];
  const small = ["딸기", "참외", "파프리카"];

  const handleSlect = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <span>작물</span>
        <select onChange={handleSlect}>
          <option value="" title="대분류">
            ::전체::
          </option>
          {big.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select onChange={handleSlect}>
          <option value="">::전체::</option>
          {middle1.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select onChange={handleSlect}>
          <option value="">::전체::</option>
          {small.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="app-1">
        <div>dsfs</div>
        <div>dsfs</div>
      </div>
      <div className="app-2">
        <div className="app2">
          <div className="app-2-1">
            <div className="ddd">asdas</div>
            <div className="dd">asdassfsf</div>
          </div>
          <div className="app2-11">이미지</div>
        </div>
        <div className="app-2-2">ff</div>
      </div> */}
    </div>
  );
}

export default App;
