import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { DateTimePicker } from "@material-ui/pickers";
import moment from "moment";

const AssignmentPage = (props) => {
    const { user, authToken } = useContext(AuthContext);
    const [assignment, setAssignment] = useState([]);
    const [assignmentA, setAssignmentA] = useState([]);
    const params = useParams();
    const [deadline, setDeadline] = useState(new Date());
    const formData = new FormData()
    const [file, setFile] = useState('')
    const handleChange = (event) => {
      setFile(event.target.files[0])
    }
    console.log(assignment)
    const[description,setDescription] = useState(null)
    const[assignment_name,setassingment_name] = useState(null)

  
    useEffect(() => {
      getAssignment()
  }, [user, authToken]);
  function getAssignment(){
    
    if (user && authToken) {
      fetch(API + "course/" + params.id + "/assignment/", {
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
          setAssignment(data);
        })
        .catch((error) => {});
    }
  }

  function createassignment(event) {
    const formData = new FormData()
    formData.append("course", params.id)
    formData.append("deadline", deadline)
    // formData.append("deadline",'2022-08-06T01:10:00')
    formData.append("description",description)
    formData.append("assignment_name",assignment_name)
    formData.append("file",file)
    console.log(formData)

    event.preventDefault();
    if (user && authToken) {
      // console.log(assignmentA)
      fetch(API + "course/" + params.id + "/assignment/", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authToken.access,
        },
        body: formData,
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
          setAssignmentA(data);
        })
        .catch((error) => {});
    }
  }

  function deleteAssignment(assignmentid) {
    if (user && authToken) {
      fetch(API + "course/" + params.id + "/assignment/" + assignmentid + "/", {
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
          getAssignment();
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
          <p className="text-success fs-4">Course Assignment</p>
          {props.user && props.user.usertype === "teacher" && (
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              <i className="bi bi-plus-lg"></i>
              Create Assignment
            </button>
          )}
        </div>
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-dialog-centered mx-auto">
            <div className="modal-content">
              <div className="modal-header bg-light bg-gradient">
                <h5 className="modal-title p-2 fw-bold fs-4">
                  Create Assignment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3 px-3">
                    <label className="form-label required">
                      Assignement Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mcqname"
                      name="mcqname"
                      onChange={(e) => {
                        setassingment_name(e.target.value)
                      }}
                      />
                    </div>
                    <div class="mb-3 px-3">
                      <label class="form-label required">description</label>
                      <input type="text" class="form-control" 
                      id="mcqname"
                      name="mcqname"
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                    />

                    {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="description">
                         onChange={(e) => {
                         setAssignmentA({ ...assignmentA, description: e.target.value})
                       }}

                      </textarea> */}
                    {/* <input type="text" className="form-control" 
                      id="coursecode"
                      name="coursecode"
                      onChange={(e) => {
                        setMcqA({ ...mcqA, course_code: e.target.value})
                      }}/> */}
                  </div>
                  <div className="mb-3 px-3">
                    <label className="form-label required">Deadline</label>
                    <DateTimePicker
                      disableToolbar
                      value={deadline}
                      name="deadline"
                      onChange={setDeadline}
                    />
                    </div>
                    <div>
               <input type="file"  name="profile_pic"
                label="Upload Profile Picture"
                onChange={(e)=> handleChange(e)}/>
               {/* <button type="submit" onClick={}} className="btn btn-primary shadow">Submit</button> */}
              </div>
                  </form>
                </div>
                <div class="modal-footer bg-light ">
                  <button type="submit" onClick={createassignment} data-bs-dismiss="modal" class="btn btn-success m-22">
                    Submit
                  </button>
                  <button
                    type="submit"
                    class="btn btn-danger m-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {assignment.length === 0 ? (
          <div className="row">
            <div className="card" style={{ background: "#FFFFFF" }}>
              <div className="card-body p-4 text-secondary">
                <h4 className="card-title">No Assignment to show</h4>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {assignment.map((assignments) => (
            <div class="card" style={{ background: "#FFFFFF" }} key="assignment.id">
              <div class="card-body p-4 text-secondary">
              <div className="container-fluid border-bottom border-success d-flex justify-content-between ">
              {props.user && props.user.usertype === "teacher" && (
              <Link to={"/studentassignmentview/" + params.id + "/" + assignments.id} >
              <h4 class="card-title">{assignments.assignment_name}</h4>  
            </Link>
              )}
             {props.user && props.user.usertype === "student" && (
              <Link to={"/assignment/" + params.id + "/" + assignments.id} >
              <h4 class="card-title">{assignments.assignment_name}</h4>  
            </Link>
              )}
              <a onClick = {(event)=>{event.preventDefault();window.open(assignments.file_url, '_blank').focus();} } >
                <p4 >View Assignment</p4>  
              </a>
              <div>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      deleteAssignment(assignments.id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
                <h5 class="card-title"> Deadline {moment(assignments.deadline).fromNow()}</h5>
                </div>
              </div>
              </div>
            ))}
          </div>
           )}
      </div>
    
  );
};

export default AssignmentPage;
