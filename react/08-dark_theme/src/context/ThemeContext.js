import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../theme/theme";
import { ThemeProvider as StyledProvider } from "styled-components";
import { getSunsetRiseData } from "../api/getLocationData";
import { getTimes } from "../utils/getDateData";

const ThemeContext = createContext(); //createContext()=전역 공간을 만들어냄

function ThemeChangeProvider({ children }) {
  // let resultData;
  // getSunsetRiseData().then((response) => (resultData = response));
  // console.log(resultData);
  // 일몰시간 불러오는 API
  // 결과값을 가지고 조건문으로 light, dark
  const localTheme = localStorage.getItem("theme") || "light";
  const [locationData, setLocationData] = useState({});
  const [themeMode, setThemeMode] = useState(localTheme);
  const themeObject = themeMode === "light" ? lightTheme : darkTheme;

  console.log(locationData);

  const handleLoad = async () => {
    const data = await getSunsetRiseData();
    const { sunrise, sunset } = data;
    const currentTime = getTimes();
    // light 테마 적용
    if (
      currentTime > Number(sunrise.trim()) &&
      currentTime < Number(sunset.trim())
    ) {
      setThemeMode("light");
    } else {
      setThemeMode("dark");
    }
    setLocationData(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;

  const toggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  };
  return [themeMode, toggleTheme];
}

export { ThemeChangeProvider, useTheme };
//로컬스토리지 함수
// setItem(key값,value값)
// getItem(key 값)
