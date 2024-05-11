import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { Link, useParams } from "react-router-dom";
import Departmentview from "./departmentview";

const AssignmentGradeView = (props) => {
    const { user, authToken } = useContext(AuthContext);
    const [assignment, setAssignment] = useState([]);
    const [studentassignment, setStudentAssignment] = useState([]);
    const [studentassignmentA, setStudentAssignmentA] = useState([]);
    const [points, setPoints] = useState(null);
    console.log(assignment)
    const params=useParams()
    console.log(points)
    // console.log(params.cid)

    useEffect(() => {
        if (user && authToken) {
          fetch(API + "course/"+ params.courseid+ "/assignment/" + params.assignmentid + "/", {
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
              setAssignment(data)
              setStudentAssignment(data.student_assignments);
            //   console.log(data)
            //   setLoading(false);
            })
            .catch((error) => {});
        }
      }, [user, authToken]);

      function updategrade(event) {
        const formData = new FormData()
        formData.append("assignment_id",params.assignmentid)
        formData.append("username",props.user.username)
        formData.append("points",points)
        event.preventDefault();
        if (user && authToken) {
          fetch(API + "course/"+ params.courseid+ "/assignment/" + params.assignmentid +"/student/", {
            method: "PUT",
            headers: {
             
              Authorization: "Bearer " + authToken.access,
            },
            body: formData,
          })
            .then((result) => result.json())
            .then((data) => {
              setStudentAssignmentA(data);
            });
        }
      }

        return (
            <div>
                 <h2 className="text-center">{assignment.assignment_name} Grade List</h2>
                 {/* <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div> */}
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Student Name</th>
                                    <> Grade</>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentassignment.map(
                                      studentassignment => 
                                        <tr key = {studentassignment.id}>
                                             <td> {studentassignment.username} </td>   
                                              <td>
                                                   {studentassignment.points}
                                              </td>
                            
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }

export default AssignmentGradeView