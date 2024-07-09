import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import "./MovieApp.css";

function MovieApp(props) {
  const [movies, setMovies] = useState([]); //영화리스트 화면
  const [isLoading, setIsLoading] = useState(true); //로딩화면스테이션
  const url =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year";
  const getMovies = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const moviesArr = data.data.movies;
    console.log(moviesArr);
    setMovies(moviesArr);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    // 전체안에서 삼합연산자 {isLoading이 true일때 로딩 false일때 영화리스트화면 표시}=>{''? "":"" }
    <div className="container">
      {isLoading ? (
        <div className="loader">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </div>
      )}
      {/* 로딩표시 */}

      {/* <div className="loader">
          <span>Loading...</span>
        </div> */}

      {/* 영화리스트 호출하는곳 */}
      {/* <div className="movies">
          {movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </div> */}
    </div>
  );
}

export default MovieApp;
