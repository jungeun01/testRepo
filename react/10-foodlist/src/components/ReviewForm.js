import React from "react";
import FileInput from "./FileInput";

function ReviewForm(props) {
  return (
    <form>
      <div>
        <FileInput />
      </div>
      <div>
        <input />
        <button>확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
