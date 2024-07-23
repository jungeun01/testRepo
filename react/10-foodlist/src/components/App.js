import "./App.css";
import logoImg from "../assets/logo.png";
import backgroundImg from "../assets/background.png";
import logoTextImg from "../assets/logo-text.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import FoodListButton from "./FoodListButton";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <nav className="App-nav-container">
          <img src={logoImg} />
        </nav>
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm />
          {/* <button>더보기</button> */}
        </div>
        <FoodListButton />
        <div className="App-filter">
          <FoodList />;
        </div>
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
          <div className="App-footer-menu">
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
