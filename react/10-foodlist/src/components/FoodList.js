import React, { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";

// 날짜 뽑아오기
function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const { title, content, calorie, createdAt, imgUrl, docId, id } = item;

  // 삭제버튼을 눌렀을때 삭제.
  const handleDeleteClick = () => {
    onDelete(docId, imgUrl);
  };

  // 수정버튼 눌렀을때 수정.
  const handleEditClick = () => {
    onEdit(id);
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

function FoodList({ items, onUpdate, onUpdateSuccess, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { title, calorie, content, imgUrl, docId } = item;
          const initialValues = { title, calorie, content, imgUrl: null };

          const handleSubmit = (collectionName, addObj) => {
            const result = onUpdate(collectionName, addObj, docId);
            return result;
          };
          const handleSubmitSuccess = (result) => {
            onUpdateSuccess(result);
            // 수정폼 리스트로 변경
            setEditingId(null);
          };
          return (
            <li key={item.docId}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={setEditingId}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.docId}>
            <FoodListItem
              onEdit={setEditingId}
              item={item}
              onDelete={onDelete}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
