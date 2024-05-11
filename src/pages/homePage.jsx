import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import homeBack from "./Images/homecoming.png";

function HomePage(props) {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    fetch(API + "notice/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(
        (response) =>
          new Promise((resolve, reject) => {
            if (response.status === 200) {
              resolve(response.json());
            } else {
              reject(response.status);
            }
          })
      )
      .then((data) => {
        setNotice(data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="container-fluid overflow-auto h-100">
      <div
        className="container-fluid d-flex justify-content-end"
        style={{
          height: "60vh",
          backgroundImage: `url(${homeBack})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-fluid ps-4 w-50 my-auto">
          <h2 className="text-capitalize text-blue text-center text-bold">
            Welcome <br />
            <span>To</span>
            <br />
            <span style={{ fontWeight: "bolder" }}>
              Student Management System
            </span>
            <br />
          </h2>
          <p className="text-md mt-2 text-black w-75 text-center mx-auto text-secondary">
            Happy Learning!
          </p>
        </div>
      </div>
      <div className="alert alert-primary text-center mt-auto">
        <h3>Notices</h3>
      </div>
      {notice.map((notice) => (
        <div className="alert alert-danger p-3 m-3">
          <strong>
            {notice.date} || By : {notice.by}{" "}
          </strong>
          <br />
          {notice.message}
          <br />
        </div>
      ))}
    </div>
  );
}

export default HomePage;
