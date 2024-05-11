import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { Link } from "react-router-dom";
import Departmentview from "./departmentview";

const Department = (props) => {
    const { user, authToken } = useContext(AuthContext);
    const [department, setDepartment] = useState([]);

    useEffect(() => {
        if (user && authToken) {
          fetch(API + "department/", {
            method: "GET",
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
              setDepartment(data);
            //   console.log(data)
            //   setLoading(false);
            })
            .catch((error) => {});
        }
      }, [user, authToken]);

        return (
            <div>
                 <h2 className="text-center">Department List</h2>
                 {/* <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div> */}
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Department Name</th>
                                    <th> Phone</th>
                                    <th> Email</th>
                                    <th> Dean</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    department.map(
                                        department => 
                                        <tr key = {department.name}>
                                             <td> {department.name} </td>   
                                             <td> {department.phone}</td>
                                             <td> {department.email}</td>
                                             <td> {department.dean}</td>
                                              <td>
                                                   {/* <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button> */}
                                                  {/* <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button> */}
                                                  {/* <button style={{marginLeft: "10px"}} onClick={ () => viewDepartment(department.name)} className="btn btn-info">View </button> */}
                                                  <Link to={'/department/'+department.name}>View</Link>
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

export default Department