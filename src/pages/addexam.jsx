import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";

const AddExam = () => {
  const [exam, setExam] = useState(null);
  const { user, authToken } = useContext(AuthContext);
  useEffect(() => {
    if (user && authToken) {
      fetch(API + "user/me/", {
        method: "POST",
        headers: {
          Accept: "application/json",
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
          setExam(data);
        })
        .catch((error) => {});
    }
  }, [user, authToken]);
  return (
    <div>
      <h2 style={{ textAlign: "center", color: "blue" }}>ADD New Exam</h2>
      <form style={{ margin: "100px", marginTop: "0px" }}>
        <div className="form-group">
          <label for="exam_name">Exam Name</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="text"
            className="form-control "
            id="exam_name"
            name="exam_name"
            placeholder="Exam name"
            //   onChange={(e) => {
            //     setNotice({ ...notice, message: e.target.value });
            //   }}
          />

          <label for="description">Description</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="text"
            className="form-control "
            id="description"
            name="description"
            placeholder="Description"
            //   onChange={(e) => {
            //     setNotice({ ...notice, message: e.target.value });
            //   }}
          />
          <label for="total_marks">Start time</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="time"
            className="form-control "
            id="start_time"
            name="start_time"
            //   placeholder="Exam name"
            //   onChange={(e) => {
            //     setNotice({ ...notice, message: e.target.value });
            //   }}
          />
          <label for="total_marks">End time</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="time"
            className="form-control "
            id="start_time"
            name="start_time"
            //   placeholder="Exam name"
            //   onChange={(e) => {
            //     setNotice({ ...notice, message: e.target.value });
            //   }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
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

export default AddExam;
