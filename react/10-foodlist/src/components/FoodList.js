import React from "react";
import "./FoodList.css";

// 날짜 뽑아오기
function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, handleDelete, handleEdit }) {
  const { title, content, calorie, createdAt, imgUrl } = item;

  const handleDeleteClick = () => {
    handleDelete(item.docId, item.imgUrl);
  };
  const handleEditClick = () => {
    handleEdit(item.id);
  };

  return (
    <div className="FoodListItem">
      <img className="FoodListItem-preview" src={imgUrl} />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <h1 className="FoodListItem-title">{title}</h1>
          <span className="FoodListItem-calorie">{calorie}kcal</span>
        </div>
        <p className="FoodListItem-content">{content}</p>
        <div className="FoodListItem-date-button">
          <p className="FoodListItem-date">{formatDate(createdAt)}</p>
          <div className="FoodListItem-button">
            <button
              className="FoodListItem-edit-button"
              onClick={handleEditClick}
            >
              수정
            </button>
            <button
              className="FoodListItem-delete-button"
              onClick={handleDeleteClick}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items }) {
  return (
    <ul className="FoodList">
      {items.map((item) => {
        return (
          <li key={item.docId}>
            <FoodListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
