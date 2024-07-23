import React from "react";
import FoodForm from "./FoodForm";
import "./FoodList.css";
import FileInput from "./FileInput";

function FoodList(props) {
  return (
    <div className="FoodList">
      <FileInput />
      <div>
        <h1>자두</h1>
        <span>25kcal</span>
      </div>
    </div>
  );
}

export default FoodList;
