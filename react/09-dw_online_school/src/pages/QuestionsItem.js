import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

function QuestionsItem({ item }) {
  const { title, createdAt, photo } = item;
  return (
    <Card>
      <div>
        <h3>
          <Link>{title}</Link>
        </h3>
        {/* <p>{photo}</p> */}
        <p>{createdAt}</p>
      </div>
    </Card>
  );
}

export default QuestionsItem;
