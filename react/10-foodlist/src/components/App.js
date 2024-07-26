import "./App.css";
import logoImg from "../assets/logo.png";
import backgroundImg from "../assets/background.png";
import logoTextImg from "../assets/logo-text.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import searchImg from "../assets/ic-search.png";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasOrderByLimit,
  updateDatas,
} from "./firebase";
import { useState, useEffect } from "react";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "../hooks/useTranslate";

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
  const [allData, setAllData] = useState([]);
  const t = useTranslate();

  // input창에 검색했을때 나오는 데이터
  const handleSubmit = (e) => {
    e.preventDefault();
    setItems(allData.filter(({ title }) => title.includes(keyWord)));
  };
  const handleKeywordChange = (e) => {
    setKeyWord(e.target.value);
    console.log(e.target.value);
  };

  const handleAllDataLoad = async () => {
    const listItems = await getDatas("food");
    setAllData(listItems);
    console.log(listItems);
  };

  // foodList데이터
  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasOrderByLimit(
      "food",
      options
    ); //컬렉션명,옵션안에들어간것들
    if (!options.lq) {
      // listItems = resultData;
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

  //새로운 데이터를 추가했을때 FoodList 표에 바로 나오는거.
  const handleAddSuccess = (resultData) => {
    setItems((prevItems) => [resultData, ...prevItems]);
  };

  // 수정한 내용을 화면에 반영하는 내용
  const handleUpdateSuccess = (result) => {
    setItems((prevItems) => {
      // 수정된 item의 index 찾기.
      const splitIdx = prevItems.findIndex((item) => item.id === result.id);
      const beforeArr = prevItems.slice(0, splitIdx);
      const afterArr = prevItems.slice(splitIdx + 1);
      return [...beforeArr, result, ...afterArr];
      // return[... prevItems.slice(0, splitIdx),result,... prevItems.slice(splitIdx + 1)]
    });
  };

  // 삭제버튼을 누르면.? 삭제됨. 파이어베이스에서 가져오고 이애들을 foodList 에 넘김.
  const handleDelete = async (docId, imgUrl) => {
    // items에서 docId를 받아온다

    // db(데이터베이스)에서 데이터 삭제(스토리지에 있는 사진파일 삭제, database에 있는 데이터 삭제)
    const { result, message } = await deleteDatas("food", docId, imgUrl);

    // 삭제 성공시 화면에 그 결과를 반영한다.
    if (!result) {
      alert(message);
      return false;
    }
    // 삭제 성공시 화면에 그 결과를 반영한다.
    // prevItems=>현재의 state 값! 지금 (15개:food의 데이터들)의 객체들을 가지고있음
    setItems((prevItems) => {
      const filteredArr = prevItems.filter((item) => {
        return item.docId !== docId;
      });
      return filteredArr;
    });
  };
  useEffect(() => {
    handleAllDataLoad();
  }, []);

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
          <FoodForm onSubmit={addDatas} onSubmitSuccess={handleAddSuccess} />
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
              {t("newest")}
            </AppSortButton>
            <AppSortButton
              selected={order === "calorie"}
              onClick={handleCalorieClick}
            >
              {t("calorie")}
            </AppSortButton>
          </div>
        </div>
        <FoodList
          items={items}
          onDelete={handleDelete}
          onUpdate={updateDatas}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button className="App-button" onClick={handleLoadMore}>
            {t("load more")}
          </button>
        )}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          <LocaleSelect />
          {/* <select>
            <option>한국어</option>
            <option>English</option>
          </select> */}
          <div className="App-footer-menu">
            {/* 서비스 이용약관 | 개인정보 처리방침 */}
            {t("Privary Policy")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
