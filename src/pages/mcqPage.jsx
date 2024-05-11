import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { Link } from "react-router-dom";
import { DateTimePicker } from "@material-ui/pickers";

const McqPage = (props) => {
  const { user, authToken } = useContext(AuthContext);
  const [mcq, setMCQ] = useState([]);
  const [mcqA, setMcqA] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const params = useParams();

  useEffect(() => {
    getMCQ();
  }, [user, authToken]);

  function getMCQ() {
    if (user && authToken) {
      fetch(API + "course/" + params.id + "/mcq/", {
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
          setMCQ(data);
        })
        .catch((error) => {});
    }
  }

  function createmcq(event) {
    event.preventDefault();
    if (user && authToken) {
      setMcqA({
        ...mcqA,
        course: params.id,
        start_time: startDate,
        end_time: endDate,
      });
      // console.log(mcqA);
      fetch(API + "course/" + params.id + "/mcq/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },
        body: JSON.stringify(mcqA),
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
          setMcqA(data);
        })
        .catch((error) => {});
    }
  }
  function deleteMCQ(mcqid) {
    if (user && authToken) {
      fetch(API + "course/" + params.id + "/mcq/" + mcqid + "/", {
        method: "DELETE",
        headers: {
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
          getMCQ();
        })
        .catch((error) => {});
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
          <p className="text-success fs-4">Course MCQ</p>

          {props.user && props.user.usertype === "teacher" && (
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              <i className="bi bi-plus-lg"></i>
              Create MCQ
            </button>
          )}
          <div class="modal" id="myModal">
            <div class="modal-dialog modal-dialog-centered mx-auto">
              <div class="modal-content">
                <div class="modal-header bg-light bg-gradient">
                  <h5 className="modal-title p-2 fw-bold fs-4">Create MCQ</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3 px-3">
                      <label className="form-label required">MCQ Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="mcqname"
                        name="mcqname"
                        onChange={(e) => {
                          setMcqA({ ...mcqA, name: e.target.value });
                        }}
                      />
                    </div>
                    <div className="mb-3 px-3">
                      <label className="form-label required">description</label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="description"
                        onChange={(e) => {
                          setMcqA({ ...mcqA, description: e.target.value });
                        }}
                      ></textarea>
                      {/* <input type="text" className="form-control" 
                      id="coursecode"
                      name="coursecode"
                      onChange={(e) => {
                        setMcqA({ ...mcqA, course_code: e.target.value})
                      }}/> */}
                    </div>
                    <div className="mb-3 px-3">
                      <label className="form-label required">Start Time</label>
                      <DateTimePicker
                        disableToolbar
                        value={startDate}
                        name="endDate"
                        onChange={setStartDate}
                      />
                    </div>
                    <div className="mb-3 px-3">
                      <label className="form-label required">End Time</label>
                      <DateTimePicker
                        disableToolbar
                        value={endDate}
                        name="endDate"
                        onChange={setEndDate}
                      />
                    </div>
                    {/* <div className="mb-3 px-3">
                      <label className="form-label required">Course Id</label>
                      <input type="date" className="form-control"
                      id="text"
                      name="year"
                      
                       />
                    </div> */}
                  </form>
                </div>
                <div className="modal-footer bg-light ">
                  <button
                    type="submit"
                    onClick={createmcq}
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
        {mcq.length === 0 ? (
          <div className="row">
            <div className="card" style={{ background: "#FFFFFF" }}>
              <div className="card-body p-4 text-secondary">
                <h4 className="card-title">No MCQ to show</h4>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {mcq.map((mcq) => (
              <div
                class="card w-100 d-flex flex-row"
                style={{ background: "#FFFFFF" }}
              >
                <div class="card-body p-4 text-secondary">
                  <Link to={"/mcqquestion/" + params.id + "/" + mcq.id}>
                    <h4 class="card-title" key={mcq.id}>
                      {mcq.name}
                    </h4>
                  </Link>
                </div>
                <div>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      deleteMCQ(mcq.id);
                    }}
                    className="btn btn-danger h-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default McqPage;
