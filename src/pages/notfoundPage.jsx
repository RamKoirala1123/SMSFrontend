import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage(props) {
  return (
    <>
      <div>404 Not Found</div>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default NotFoundPage;
