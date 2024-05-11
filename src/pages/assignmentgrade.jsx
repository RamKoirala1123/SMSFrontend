import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { DateTimePicker } from "@material-ui/pickers";
import moment from "moment";

const AssignmentGrade = (props) => {
    const { user, authToken } = useContext(AuthContext);
    const [assignment, setAssignment] = useState([]);
    const params = useParams();
  
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

  return (
    <div className="container-fluid my-2">
      <div className="rounded">
        {/* <h3 className="text-success ">Course Assignment</h3> */}
        <div
          className="container-fluid  d-flex justify-content-between border-secondary border-bottom"
          style={{ background: "aqua" }}
        >
          <p className="text-success fs-4">Assignment grade</p>
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
              <Link to={"/assignmentgradeview/" + params.id + "/" + assignments.id} >
              <h4 class="card-title">{assignments.assignment_name}</h4>  
            </Link>
              </div>
              </div>
              </div>
            ))}
          </div>
           )}
      </div>
      </div>
    
  );
};

export default AssignmentGrade;
