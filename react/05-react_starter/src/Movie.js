import React, { useState } from "react";
import "./Movie.css";
import tempImg from "./assets/까까2.jpg";

function Movie({ movie }) {
  const { title, year, medium_cover_image, summary, genres } = movie;
  return (
    <div className="movie">
      <img className="movie-img" src={medium_cover_image} />
      <div>
        <h2 className="movie-title">
          <span>{title}</span>
        </h2>
        <h3 className="movie-year">{year}</h3>
        {/* <p>{summary}</p> */}
        <p>{summary.length > 235 ? `{summary.slice(0,235)}...` : summary}</p>
        {/* 문자열 정리방법 0~235문자열까지 표시 더 넘으면...으로표시*/}
        <ul className="movie-genres">
          {/* {movie["genres"].map((genres, idx) => (
            <li key={idx}>{genres}</li>
          ))} */}
          {genres.map((g) => {
            return <li key={g}>{g}</li>;
          })}
          {/* <li>{movie.genres}</li> */}
          {/* <li>액션</li>
          <li>호러</li> */}
        </ul>
      </div>
    </div>
  );
}

export default Movie;
