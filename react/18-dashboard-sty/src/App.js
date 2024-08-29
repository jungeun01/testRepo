import "./App.css";
import React, { useState } from "react";
function App() {
  const big = ["과수", "사료", "수목"];

  const middle = {
    과수: ["견과류", "소과류", "열대과수"],
    사료: ["사료작물"],
    수목: ["수목작물", "수목나무"],
  };
  const small = {
    견과류: ["딸기"],
    소과류: ["귤", "바나나"],
    열대과수: ["망고", "파인애플"],
    사료작물: ["옥수수", "알팔파"],
    수목작물: ["소나무", "전나무"],
    수목나무: ["참나무", "단풍나무"],
  };

  // const middle1 = ["견과류", "소과류", "열대과수"];
  // const middle2 = ["사료작물"];
  // const middle3 = ["수목"];
  // const small1 = ["딸기", "참외", "파프리카"];
  // const small2 = ["밤", "귤", "바나나"];
  // const small3 = ["가지", "복숭아", "고구마"];

  const [selectedBig, setSelectedBig] = useState(""); // 첫 번째 셀렉트 선택 값
  const [middleOptions, setMiddleOptions] = useState([]); // 두 번째 셀렉트 박스 옵션
  const [selectedMiddle, setSelectedMiddle] = useState(""); // 두 번째 셀렉트 선택 값
  const [smallOptions, setSmallOptions] = useState([]); // 세 번째 셀렉트 박스 옵션

  // 첫 번쨰 셀렉트 박스 변경 핸들러
  const handleBigChang = (e) => {
    const value = e.target.value;
    setSelectedBig(value);
    setMiddleOptions(middle[value] || []);
    setSelectedMiddle("");
    setSmallOptions([]);
  };

  //  두번째 셀렉트 박스 핸들러
  const handleMiddleChange = (e) => {
    const value = e.target.value;
    setSelectedMiddle(value);
    setSmallOptions(small[value] || []);
  };

  return (
    <div className="App">
      <div>
        <span>작물</span>
        {/* 첫번쨰 셀렉트박스 */}
        <select onChange={handleBigChang}>
          <option value="" title="대분류">
            ::전체::
          </option>
          {big.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* 두번쨰 셀렉트박스 */}

        <select onChange={handleMiddleChange}>
          <option value="">::전체::</option>
          {middleOptions.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
        {/* 세번쨰 셀렉트박스 */}

        <select>
          <option value="">::전체::</option>
          {smallOptions.map((item, idx) => (
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
