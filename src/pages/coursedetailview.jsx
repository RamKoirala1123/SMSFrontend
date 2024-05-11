import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { Link } from "react-router-dom";

const CourseDetailView = (props) => {
  const { user, authToken } = useContext(AuthContext);
  const [course, setCourse] = useState([]);
  const [courseA, setCourseA] = useState([]);
  const params = useParams();

  console.log(course)

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

  // function updateLink(event) {
  //   event.preventDefault();
  //   if (user && authToken) {
  //     setCourseA({
  //       ...courseA,
  //       course_name: course.course_name,
  //       // start_time: startDate,
  //       // end_time: endDate,
  //     });
  //     fetch(API + "course/", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + authToken.access,
  //       },
  //       body: JSON.stringify(courseA),
  //     })
  //       .then(
  //         (response) =>
  //           new Promise((resolve, reject) => {
  //             if (response.status === 200) {
  //               resolve(response.json());
  //             } else {
  //               reject(response.status);
  //             }
  //           })
  //       )
  //       .then((data) => {
  //         setCourseA(data);
  //       })
  //       .catch((error) => {});
  //   }
  // }


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
                to={"/assignment/" + course.id}
                style={{ textDecoration: "none" }}
              >
                <h6 className="text-center text-white fw-bold m-b-20">
                  Assignment
                </h6>
                {/* <h6 className="text-center text-success fst-italic m-b-20">{course.course_name}</h6> */}
              </Link>
              <br />
              <h2 className="text-right">
                <Link
                  to={"/assignment/" + course.id}
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
              <Link to={"/mcq/" + course.id} style={{ textDecoration: "none" }}>
                <h6 className="text-center text-white fw-bold m-b-20">
                  Quizzes
                </h6>
                {/* <h6 className="text-center text-success fst-italic m-b-20">{course.course_name}</h6> */}
              </Link>
              <br />
              <h2 className="text-right">
                <Link
                  to={"/mcq/" + course.id}
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
              background: "linear-gradient(45deg, #4099ff, #73b4ff)",
            }}
          >
            <div className="card-block d-flex flex-column justify-content-between">
                <h6 className="text-center text-white fw-bold m-b-20 ">
                  Meet Link
                </h6>
              
              <br />
              <h2 className="text-right d-flex justify-content-between m-2">
              <a onClick = {(event)=>{event.preventDefault();window.open('https://meet.google.com/gee-iibt-auu', '_blank').focus();} } >
                <p4 className="fs-5">Join Meet</p4>  
              </a>
              
              {/* {props.user && props.user.usertype === "teacher" && (
                        <button
                        data-bs-toggle="modal"
                        data-bs-target="#myModal1"
                        type="button"
                          className="btn btn-primary align-self-end"
                        >
                          Update
                        </button>
                      )} */}
                {/* <Link
                  to={"/assignment/" + course.id}
                  style={{ textDecoration: "none" }}
                >
                  <i
                    className="bi-eye-fill float-right m-2 icon-hover-effect"
                    style={{ fontSize: "2rem", color: "black" }}
                  ></i>
                </Link> */}
              </h2>
            </div>
        <div className="modal" id="myModal1">
          <div className="modal-dialog modal-dialog-centered mx-auto">
            <div className="modal-content">
              <div className="modal-header bg-light bg-gradient">
                <h5 className="modal-title p-2 fw-bold text-black fs-4">Update Link</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3 px-3">
                    <label className="form-label required">Meet Link</label>
                    <input
                      type="text"
                      className="form-control"
                      id="coursename"
                      name="coursename"
                      placeholder="Enter Meet Link"
                      onChange={(e) => {
                        setCourseA({
                          ...courseA,
                          link: e.target.value,
                        });
                      }}
                    />
                  </div>
                  
                </form>
              </div>
              <div className="modal-footer bg-primary">
                
                  <button
                    type="submit"
                    // onClick={updateLink}
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
        </div>
        {props.user && props.user.usertype === "teacher" && (
          <div className="col-md-4 col-xl-3 ">
            <div
              className="card m-3 h-100 "
              style={{
                color: "#fff",
                background: "linear-gradient(45deg, #FFB64D, #ffcb80)",
              }}
            >
              <div className="card-block">
                <Link
                  to={"/grades/" + course.id}
                  style={{ textDecoration: "none" }}
                >
                  <h6 className="text-center text-white fw-bold m-b-20">
                    Grades
                  </h6>
                  {/* <h6 className="text-center text-success fst-italic m-b-20">{course.course_name}</h6> */}
                </Link>
                <br />
                <h2 className="text-right">
                  <Link
                    to={"/grades/" + course.id}
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
        )}
      </div>
    </div>

    // <div>
    // <div className="card col offset-md-3">
    //   <h3 className="text-center">{course.course_code}</h3>
    //   <div className="card-body">
    //     <div className="row p-2">
    //       <label> Course Code:  {course.course_code} </label>
    //     </div>
    //     <div className="row p-2">
    //       <label> Course Name: {course.course_name}</label>
    //     </div>
    //     <div className="row p-2">
    //       <label> Section: {course.section}</label>
    //     </div>
    //     <div className="row p-2">
    //       <label> Semester: {course.semester}</label>
    //     </div>
    // </div>
    // <Link to ={'/createexam/'+course.id}>
    // <button>Create Exam</button>
    // </Link>
    // <Link to ="/createassignment">
    // <button>Create Assignment</button>
    // </Link>
    // </div>
    // </div>
  );
};

export default CourseDetailView;
