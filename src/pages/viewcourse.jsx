import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { Link } from "react-router-dom";
import { ReactComponent as EyeIcon } from "bootstrap-icons/icons/eye-fill.svg";

const ViewCourse = (props) => {
  const { user, authToken } = useContext(AuthContext);
  const [course, setCourse] = useState([]);
  const [courseA, setCourseA] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getcourse();
  }, [user, authToken]);

  function getcourse() {
    if (user && authToken) {
      fetch(API + "course/", {
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
          //   console.log(data)
          setLoading(false);
        })
        .catch((error) => {});
    }
  }

  function createCourse(event) {
    event.preventDefault();
    if (user && authToken) {
      fetch(API + "course/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },
        body: JSON.stringify(courseA),
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
          setCourseA(data);
        })
        .catch((error) => {});
    }
  }

  function deletecourse(id) {
    if (user && authToken) {
      fetch(API + "course/" + id + "/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },
      }).then((result) => {
        result.json().then((resp) => {
          console.log(resp);
          getcourse();
        });
      });
    }
  }

  return (
    <div className="container-fluid my-2">
      <div className="rounded">
        {/* <h3 className="text-success ">Course Assignment</h3> */}
        <div
          className="container-fluid  d-flex justify-content-between border-secondary border-bottom"
          style={{ background: "aqua" }}
        >
          <p className="text-success fs-4">Courses</p>
          {props.user && props.user.usertype === "teacher" && (
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              <i className="bi bi-plus-lg"></i>
              Create Course
            </button>
          )}
        </div>
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-dialog-centered mx-auto">
            <div className="modal-content">
              <div className="modal-header bg-light bg-gradient">
                <h5 className="modal-title p-2 fw-bold fs-4">Create Course</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3 px-3">
                    <label className="form-label required">Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="coursename"
                      name="coursename"
                      onChange={(e) => {
                        setCourseA({
                          ...courseA,
                          course_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3 px-3">
                    <label className="form-label required">Course Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="coursecode"
                      name="coursecode"
                      onChange={(e) => {
                        setCourseA({
                          ...courseA,
                          course_code: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3 px-3">
                    <label className="form-label required">Section</label>
                    <input
                      type="text"
                      className="form-control"
                      id="section"
                      name="section"
                      onChange={(e) => {
                        setCourseA({ ...courseA, section: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-3 px-3">
                    <label className="form-label required">Semester</label>
                    <input
                      type="text"
                      className="form-control"
                      id="semester"
                      name="semester"
                      onChange={(e) => {
                        setCourseA({ ...courseA, semester: e.target.value });
                      }}
                    />
                  </div>
                  <div className="mb-3 px-3">
                    <label className="form-label required">Year</label>
                    <input
                      type="date"
                      className="form-control"
                      id="year"
                      name="year"
                      onChange={(e) => {
                        setCourseA({ ...courseA, year: e.target.value });
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer bg-primary">
                <button
                  type="submit"
                  onClick={createCourse}
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                />
                <div className="modal-footer bg-light ">
                  <button
                    type="submit"
                    onClick={createCourse}
                    data-bs-dismiss="modal"
                    className="btn btn-success m-22"
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger m-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row">
            {course.map((course) => (
              <div className="col-md-4 col-xl-3 ">
                <div
                  className="card m-3 h-100 "
                  style={{
                    color: "#fff",
                    background: "linear-gradient(45deg, #2ed8b6, #59e0c5)",
                  }}
                  key={course.id}
                >
                  <div className="card-block">
                    <Link
                      to={"/course/" + course.id}
                      style={{ textDecoration: "none" }}
                    >
                      <h6 className="text-center text-white fw-bold m-b-20">
                        {course.course_code}
                      </h6>
                      <h6 className="text-center text-success fw-italic m-b-20">
                        {course.course_name}
                      </h6>
                    </Link>
                    <br />
                    <h2 className="text-right d-flex flex-row justify-content-between">
                      <Link
                        to={"/course/" + course.id}
                        style={{ textDecoration: "none" }}
                      >
                        <i
                          className="bi-eye-fill m-2 icon-hover-effect"
                          style={{ fontSize: "2rem", color: "black" }}
                        ></i>
                      </Link>
                      {props.user && props.user.usertype === "teacher" && (
                        <button
                          onClick={() => deletecourse(course.id)}
                          className="btn"
                        >
                          <i
                            className="bi-trash m-2 icon-hover-effect me-4"
                            style={{ fontSize: "2rem", color: "black" }}
                          ></i>
                        </button>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default ViewCourse;
