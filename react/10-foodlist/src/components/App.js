import "./App.css";
import logoImg from "../assets/logo.png";
import backgroundImg from "../assets/background.png";
import logoTextImg from "../assets/logo-text.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import searchImg from "../assets/ic-search.png";
import { deleteDatas, getDatasOrderByLimit } from "./firebase";
import { useState, useEffect } from "react";

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
}

const LIMITS = 5;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [keyWord, setKeyWord] = useState("");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);

  // foodList데이터
  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasOrderByLimit(
      "food",
      options
    ); //컬렉션명,옵션안에들어간것들
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    setLq(lastQuery);
    if (!lastQuery) {
      setHasNext(false);
    }
  };

  // 더보기
  const handleLoadMore = async () => {
    handleLoad({ fieldName: order, limits: LIMITS, lq: lq });
  };

  // 최신순,칼로리순 버튼
  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  // 삭제버튼을 누르면.?.
  // const handleDelete = async (docId, imgUrl) => {
  //   const result = await deleteDatas("food", docId, imgUrl);
  //   if (!result) {
  //     alert("저장된 이미지 파일이 없습니다.\n관리자에게 문의하세요");
  //     return false;
  //   }
  //   setItems((prevItems) => {
  //     const filteredArr = prevItems.filter((item) => {
  //       return item.docId !== docId;
  //     });
  //     return filteredArr;
  //   });
  // };

  const handleKeywordChange = (e) => {
    setKeyWord(e.target.value);
  };

  // input창에 검색했을때 나오는 데이터
  const handleSubmit = (e) => {
    e.preventDefault();
    setItems(items.filter(({ title }) => title.includes(keyWord)));
  };

  useEffect(() => {
    handleLoad({ fieldName: order, limits: LIMITS, lq: undefined });
  }, [order]);

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
        </div>
        <div className="App-filter">
          <form className="App-search" onSubmit={handleSubmit}>
            <input
              className="App-search-input"
              onChange={handleKeywordChange}
              value={keyWord}
            />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              selected={order === "createdAt"}
              onClick={handleNewestClick}
            >
              최신순
            </AppSortButton>
            <AppSortButton
              selected={order === "calorie"}
              onClick={handleCalorieClick}
            >
              칼로리순
            </AppSortButton>
          </div>
        </div>
        <FoodList items={items} />
        {hasNext && (
          <button className="App-button" onClick={handleLoadMore}>
            더보기
          </button>
        )}
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
