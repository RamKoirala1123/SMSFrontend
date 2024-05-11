import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";

const CreateCourse = () => {
  const [course, setCourse] = useState(null);
  const { user, authToken } = useContext(AuthContext);
  // useEffect(() => {
  //   createcourse()
  //   }, [user, authToken]);
  // function createCourse(event) {
  //   event.preventDefault();
  //   if (user && authToken) {
  //     fetch(API + "course/", {
  //       method: "PUT",
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization: "Bearer " + authToken.access,
  //       },
  //       body: JSON.stringify(course),
  //     })
  //       .then((result) => result.json())
  //       .then((data) => {
  //         setCourse(data);
  //       });
  //   }
  // }

  function createCourse(event) {
    event.preventDefault();
    if (user && authToken) {
      fetch(API + "course/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },
        body: JSON.stringify(course),
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
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "blue" }}>ADD NEW COURSE</h2>
      <form style={{ margin: "100px", marginTop: "0px" }}>
        <div className="form-group">
          <option></option>
        </div>
        <div className="form-group">
          <label for="course_name">Course Name</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="text"
            className="form-control "
            id="course_name"
            name="course_name"
            placeholder="Course name"
            onChange={(e) => {
              setCourse({ ...course, course_name: e.target.value });
            }}
          />

          <label for="course_code">Course Code</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="text"
            className="form-control "
            id="course_code"
            name="course_code"
            placeholder="Course Code"
            onChange={(e) => {
              setCourse({ ...course, course_code: e.target.value });
            }}
          />
          <label for="year">Year</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="date"
            className="form-control "
            id="year"
            name="year"
            //   placeholder="Exam name"
            onChange={(e) => {
              setCourse({ ...course, year: e.target.value });
            }}
          />
          <label for="semester">Section</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="text"
            className="form-control "
            id="semester"
            name="semester"
            placeholder="Section"
            onChange={(e) => {
              setCourse({ ...course, section: e.target.value });
            }}
          />
          <label for="semester">Semester</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="text"
            className="form-control "
            id="semester"
            name="semester"
            placeholder="Semester"
            onChange={(e) => {
              setCourse({ ...course, semester: e.target.value });
            }}
          />
        </div>

        <button
          type="submit"
          onClick={createCourse}
          className="btn btn-primary"
        >
          {" "}
          ADD
        </button>
      </form>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default CreateCourse;
