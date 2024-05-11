import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { Link, useParams } from "react-router-dom";
import Departmentview from "./departmentview";

const StudentAssignmentView = (props) => {
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
                 <h2 className="text-center">{assignment.assignment_name} Submission List</h2>
                 {/* <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div> */}
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Student Name</th>
                                    <th> Submission Status</th>
                                    <th> Submitted File</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentassignment.map(
                                      studentassignment => 
                                        <tr key = {studentassignment.id}>
                                             <td> {studentassignment.username} </td>   
                                             <td> {studentassignment.submission_status}</td>
                                             <td> <a onClick = {(event)=>{event.preventDefault();window.open(studentassignment.file_url, '_blank').focus();} } >
                <p4 >View Submission</p4>  
              </a></td>
                                              <td>
                                                   {/* <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button> */}
                                                  {/* <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button> */}
                                                  {/* <button style={{marginLeft: "10px"}} onClick={ () => viewDepartment(department.name)} className="btn btn-info">View </button> */}
                                                  <form>
                                                  <input type="text" name="assignmentpoints"  onChange={(e) => {setPoints(e.target.value)}}
                                                  />
                                                  </form>
                                                  {/* {studentassignment.points} */}
                                                  <button onClick={updategrade}>Update</button>
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

export default StudentAssignmentView