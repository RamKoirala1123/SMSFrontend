import React from "react";
import ErrorContext from "../context/errorContext";

import API from "../context/apiContext";
import { useState, useContext } from "react";

import generaluser from "./Images/generaluser.png";
import { Link } from "react-router-dom";
import Background from "./background.jpg"

function SignupPage(props) {
  const [usern, setUsername] = useState(null);
  const { setError } = useContext(ErrorContext);

  function createUser(event) {
    event.preventDefault();
    fetch(API + "create_user/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(usern),
    })
      .then(
        (response) =>
          new Promise((resolve, reject) => {
            if (response.status === 201) {
              resolve(response.json());
            } else {
              reject(response.statusText);
            }
          })
      )
      .then((result) => {
        setUsername(result);
      })
      .catch((err) => {
        setError(err);
      });
  }

  const loginstyle={
    backgroundImage: `url(${Background})`,
    justifyContent: 'center',
    height:'100vh'
  }
 
  return (
    <div className="container p-2" style={loginstyle}>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card ">
            <div className="card-body">
              <div className="row">
                <div className="col mt-4">
                  <center>
                    <img width="100px" src={generaluser} alt="general user" />
                    <h3>Signup</h3>
                  </center>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <hr className="my-2" />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 p-2 ">
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      placeholder="First name"
                      onChange={(e) => {
                        setUsername({ ...usern, first_name: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-6 p-2">
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      placeholder="Last name"
                      onChange={(e) => {
                        setUsername({ ...usern, last_name: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 p-2">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter you email address"
                      onChange={(e) => {
                        setUsername({ ...usern, email: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-6 p-2">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <div className="form-group">
                      <input
                        type="Date"
                        className="form-control"
                        id="dob"
                        name="dob"
                        onChange={(e) => {
                          setUsername({ ...usern, dob: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col p-2">
                  <div className="form-group">
                    <label>Email from Work</label>
                    <input
                      className="form-control"
                      id="email_from_work"
                      placeholder="Email from WOrk"
                      type="text"
                      name="email_from_work"
                      onChange={(e) => {
                        setUsername({
                          ...usern,
                          email_from_work: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* <div className="col p-2">
                  <div className="form-group">
                    <label>Gender</label>
                    <input
                      className="form-control"
                      id="gender"
                      placeholder="gender"
                      type="text"
                      name="gender"
                      onChange={(e) => {
                        setUsername({ ...usern, gender: e.target.value });
                      }}
                    />
                  </div>
                </div> */}
                <div className="col p-2">
                   <div className="form-group">
                     <label htmlFor="gender">Gender</label>
                        <select onChange={(e) => {setUsername({ ...usern, gender: e.target.value });}} 
                         className="form-control" id="gender" name="gender">
                        <option value="none" selected disabled hidden>Select an Option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        </select>
                     </div>
                      </div>
              </div>
              <div className="col p-2"> 
                     <div className="form-group">
                     <label htmlFor="user_type">User Type</label>
                        <select  onChange={(e) => {
                              setUsername({ ...usern, usertype: e.target.value });}}
                        className="form-control" id="user_type" name="user_type">
                        <option value="none" selected disabled hidden>Select an Option</option>
                        <option value="teacher">teacher</option>
                        <option value="staff">staff</option>
                        <option value="student">student</option>
                        </select>
                     </div>
                </div>
              {/* <div className="col p-2">
                <div className="form-group">
                  <label>User Type</label>
                  <input
                    className="form-control"
                    id="user_type"
                    placeholder="User Type"
                    type="text"
                    name="user_type"
                    onChange={(e) => {
                      setUsername({ ...usern, usertype: e.target.value });
                    }}
                  />
                </div>
              </div> */}
              <div className="col p-2">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    className="form-control"
                    id="username"
                    placeholder="username"
                    type="text"
                    name="username"
                    onChange={(e) => {
                      setUsername({ ...usern, username: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="col p-2">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    id="password1"
                    name="password1"
                    placeholder="Enter your password"
                    type="Password"
                    onChange={(e) => {
                      setUsername({ ...usern, password: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-8 mx-auto pb-2">
                  <center>
                    <div className="form-group">
                      <button
                        type="submit"
                        onClick={createUser}
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Signup
                      </button>
                    </div>
                    <div className="form-group">
                    <small className="mt-2">Already have an account? <Link to="/login">Log In</Link></small>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
