import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { Link } from "react-router-dom";

const GradeView = (props) => {
  const { user, authToken } = useContext(AuthContext);
  const [course, setCourse] = useState([]);
  const [courseA, setCourseA] = useState([]);
  const params = useParams();

  // console.log(course)

  useEffect(() => {
    if (user && authToken) {
      fetch(API + "course/" + params.id + "/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authToken.access,
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
          setCourse(data);
        })
        .catch((error) => {});
    }
  }, [user, authToken]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-xl-3 ">
          <div
            className="card m-3 h-100 "
            style={{
              color: "#fff",
              background: "linear-gradient(45deg, #4099ff, #73b4ff)",
            }}
          >
            <div className="card-block">
              <Link
                to={"/assignmentgrade/" + course.id}
                style={{ textDecoration: "none" }}
              >
                <h6 className="text-center text-white fw-bold m-b-20">
                  Assignment Grades
                </h6>
                {/* <h6 className="text-center text-success fst-italic m-b-20">{course.course_name}</h6> */}
              </Link>
              <br />
              <h2 className="text-right">
                <Link
                  to={"/assignmentgrade/" + course.id}
                  style={{ textDecoration: "none" }}
                >
                  <i
                    className="bi-eye-fill float-right m-2 icon-hover-effect"
                    style={{ fontSize: "2rem", color: "black" }}
                  ></i>
                </Link>
              </h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-xl-3 ">
          <div
            className="card m-3 h-100 "
            style={{
              color: "#fff",
              background: "linear-gradient(45deg, #2ed8b6, #59e0c5)",
            }}
          >
            <div className="card-block">
              <Link to={"/mcqgrade/" + course.id} style={{ textDecoration: "none" }}>
                <h6 className="text-center text-white fw-bold m-b-20">
                  MCQ Grades
                </h6>
                {/* <h6 className="text-center text-success fst-italic m-b-20">{course.course_name}</h6> */}
              </Link>
              <br />
              <h2 className="text-right">
                <Link
                  to={"/mcqgradeview/"+ params.id + "/" + course.id}
                  style={{ textDecoration: "none" }}
                >
                  <i
                    className="bi-eye-fill float-right m-2 icon-hover-effect"
                    style={{ fontSize: "2rem", color: "black" }}
                  ></i>
                </Link>
              </h2>
            </div>
          </div>
        </div>
             </div>
    </div>
  );
};

export default GradeView;
