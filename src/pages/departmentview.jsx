import React from "react";
import { Carousel } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import "../components/css/carousel.css";

const Departmentview = (props) => {
  const { user, authToken } = useContext(AuthContext);
  const [department, setDepartment] = useState([]);
  const [deptPhotos, setDeptPhotos] = useState([]);
  const [deptSections, setDeptSection] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (user && authToken) {
      fetch(API + "department/" + params.name + "/", {
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
          setDeptPhotos(data.department_photos);
          setDeptSection(data.sections);
        })
        .catch((error) => {});
    }
  }, [user, authToken]);

  return (
    <div>
      <div className="card col offset-md-3">
        <h3 className="text-center">Department Details</h3>
        <div className="card-body">
          <div className="row p-2">
            <label> Department Name:  {department.name} </label>
          </div>
          <div className="row p-2">
            <label> Phone: {department.phone}</label>
          </div>
          <div className="row p-2">
            <label> Email: {department.email}</label>
          </div>
          <div className="row p-2">
            <label>Dean: {department.dean}</label>
          </div>
        </div>
           <h4 className="p-0 ms-2 text-primary">Sections</h4>
            {/* <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div> */}
            <div className="row">
              <table className="table table-borderless m-2">
                <thead className="table-success">
                  <tr className="d-flex  flex-row justify-content-right align-item-right">
                    <th className="col-md-3"> Section Name</th>
                    <th className="col-md-7"> Description</th>
                  </tr>
                </thead>
                <tbody>
                  {deptSections.map((deptSections) => (
                    <tr key={deptSections.name} className="d-flex  flex-row justify-content-right align-item-right">
                      <td className="table-primary col-md-3"> {deptSections.name} </td>
                      <td className="table-primary col-md-7"> {deptSections.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* {Image Carousel} */}
          <div className="col-12">
            {/* <h3 className="text-center">Department Photos</h3> */}
            <Carousel fade variant="dark">
              {deptPhotos.map((deptPhotos) => (
                //  <Carousel.Item key={department.name}>
                <Carousel.Item>
                  <img
                    className="d-block w-100 h-75 p-5 pt-1"
                    src={deptPhotos}
                    alt="Department Photos"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        {/* </div> */}
      </div>
   
  );
};

export default Departmentview;
