import React from "react";
import { Link } from "react-router-dom";

function McqCards(props) {
  return (
    <div style={{ width: "30%" }} className="card m-2 border border-primary p2">
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title p-1">Card title</h5>
        <p className="card-text p-2">
          MCQ description goes here.MCQ description goes here.MCQ description
          goes here.
        </p>
        <Link
          className="btn btn-primary p-1"
          to={`/item-detail/${props.id}`}
          // Link needs to be updated later
        >
          Take this MCQ
        </Link>
      </div>
    </div>
  );
}

export default McqCards;
