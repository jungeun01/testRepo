import React from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import { useState } from "react";
import { addDatas } from "./firebase";
import useTranslate from "../hooks/useTranslate";
import useAsync from "../hooks/useAsync";

const INITIAL_VALUES = { title: "", content: "", calorie: 0, imgUrl: null };

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm({
  onSubmit,
  onSubmitSuccess,
  onCancel,
  initialValues = INITIAL_VALUES,
  initialPreview,
}) {
  const [values, setValues] = useState(initialValues);
  // const [isSubmitting, setIsSubmitting] = useState(false); //비동기 통신의 결과를 기다려주는 역할
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

  const t = useTranslate();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsSubmitting(true);
    const resultData = await onSubmitAsync("food", values);
    // setIsSubmitting(false);
    onSubmitSuccess(resultData);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        className="FoodForm-preview"
        name="imgUrl"
        value={values.imgUrl}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            className="FoodForm-title"
            type="text"
            onChange={handleInputChange}
            placeholder={t("title placeholder")}
            name="title"
            value={values.title}
          />
          <input
            className="FoodForm-calorie"
            type="number"
            onChange={handleInputChange}
            name="calorie"
            value={values.calorie}
          />
          {onCancel && ( //FoodForm에서는 취소버튼이 안나오고 FoodList 에서 수정버튼클릭시 취소버튼이 나오게 하는거
            <button
              className="FoodForm-cancel-button"
              type="button"
              onClick={() => onCancel(null)}
            >
              {t("cancel button")}
            </button>
          )}
          <button
            className="FoodForm-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {t("confirm button")}
          </button>
        </div>
        <textarea
          onChange={handleInputChange}
          placeholder={t("content placeholder")}
          className="FoodForm-content"
          name="content"
          value={values.content}
        />
      </div>
    </form>
  );
}

export default FoodForm;
