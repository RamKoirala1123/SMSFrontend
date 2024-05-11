import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import "../components/css/profilePage.css";

import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import genuser from "./Images/generaluser.png"
import { ReactComponent as UploadIcon } from "bootstrap-icons/icons/upload.svg";

function ProfilePage(props) {
  const { user, authToken } = useContext(AuthContext);
  const [usern, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
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
          setUsername(data);
          setLoading(false);
        })
        .catch((error) => {});
    }
  }, [user, authToken]);

  function updateUser(event) {
    event.preventDefault();
    if (usern && authToken) {
      fetch(API + "user/" + usern.username + "/", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },

        body: JSON.stringify(usern),
      })
        .then((result) => result.json())
        .then((data) => {
          setUsername(data);
        });
    }
  }

  const [image, setImage] = useState('')
  const handleChange = (event) => {
    setImage(event.target.files[0])
  }
  function uploadfiles(){
    document.getElementById('custom-file').click();
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", image)

    if (usern && authToken) {
      fetch(API + "upload_profile/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken.access,
        },

        body: formData,
      })
        .then((result) => result.json());
    }
  }

  return loading ? (
    <React.Fragment> " "</React.Fragment>
  ) : (
    <div className="container">
      <h2 className="mb-4 mt-4 text-center font-weight-bold">Edit Profile</h2>
      <hr />
      <Row className="profileContainer mx-auto ">
        <Col className="mx-4 mt-3">
          <Form>
            <Form.Group controlId="fname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter First Name"
                value={usern.first_name}
                onChange={(e) =>
                  setUsername({ ...usern, first_name: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter Last Name"
                value={usern.last_name}
                onChange={(e) =>
                  setUsername({ ...usern, last_name: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                className="mb-2"
                type="email"
                placeholder="Enter Email"
                value={usern.email}
                onChange={(e) =>
                  setUsername({ ...usern, email: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="dob">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                className="mb-2"
                type="date"
                placeholder="Year/month/day"
                value={usern.dob ? usern.dob : ""}
                onChange={(e) => setUsername({ ...usern, dob: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="pic">
              <Form.Label>Change Profile Picture</Form.Label>
              <Form.Control
                className="mb-2"
                id="custom-file"
                type="file"
                name="profile_pic"
                label="Upload Profile Picture"
                onChange={(e)=> handleChange(e)}
              />
              {/* <label htmlFor="custom-file">
                <Button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary shadow"
              >updatepics</Button>
              </label> */}
            </Form.Group>
            {/* <Form.Group controlId="pic">
              <Form.Label>Change Profile Picture</Form.Label>
              {/* <Form.Control
                className="mb-2"
                id="custom-file"
                type="file"
                name="profile_pic"
                label="Upload Profile Picture"
              /> 
            </Form.Group> */}
            <Form.Group className="py-3">
              <Button
                type="submit"
                onClick={updateUser}
                className="btn btn-primary shadow"
              >
                Update
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col className="mx-4 mt-3">
        {usern.image_url!=null ?
          <img src={usern.image_url} alt="profilepic" className="profilePic " /> :
          <img src={genuser} alt="profilepic" className="profilePic " />
        }
        {/* <button type="submit" onClick={uploadfiles}>aaa</button> */}
        <button type="submit" onClick={handleSubmit} className="btn btn-primary shadow">
        <UploadIcon />
        </button>
        </Col>
      </Row>
    </div>
  );
}

export default ProfilePage;
