import React from "react";
import "./FoodListButton.css";

function FoodListButton(props) {
  return (
    <form className="FoodListForm">
      <input />
      <div className="FoodListButton">
        <button>최신순</button>
        <button>칼로리순</button>
      </div>
    </form>
  );
}

export default FoodListButton;
