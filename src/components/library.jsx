import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as BookIcon } from "../logo.svg";

function BookItem(props) {
  return (
    <div className="card ms-1 m-md-2" style={{ width: "18rem" }}>
      <Link to={`item-detail/${props.id}`}>
        <BookIcon className="card-img-top" />
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </Link>
    </div>
  );
}

export default BookItem;
