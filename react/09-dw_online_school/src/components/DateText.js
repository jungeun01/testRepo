import React from "react";

function DateText({ value }) {
  // 날짜객체
  if (!value) return;
  return new Date(value).toLocaleDateString("ko-KR");
  return <div></div>;
}

export default DateText;
