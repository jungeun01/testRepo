import "./App.css";
import close from "./assets/x.svg";
function App() {
  return (
    <div className="App">
      <div>
        <div className="App-color">
          <h1>새 컬러 등록하기</h1>
          <img src={close} />
        </div>
        <div className="App-container">
          <h3>MBTI</h3>
          <div className="App-m">
            <div className="App-line">
              <span>E</span>
              <p>외향형</p>
            </div>
            <div className="App-line">
              <span>I</span>
              <p>내향형</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
