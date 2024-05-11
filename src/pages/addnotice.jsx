import React from 'react'
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import userEvent from '@testing-library/user-event';
// import "../components/css/addnotice.css";


const AddNotice = (props) => {
  const [notice, setNotice] = useState(null);
  const { user, authToken } = useContext(AuthContext);
  // console.log(props.user.username)
  function addNotice(event) {
    event.preventDefault();
    if (user && authToken) {
      fetch(API + "add_notice/", {
        method: "POST",
        headers: {
         "content-type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },
        body: JSON.stringify(notice),
      })
        .then((result) => result.json())
        .then((data) => {
          setNotice(data);
        });
    }
  }
   
  return (
  <div className="container register-form">
    <div className="form col-12">
      <div className="note text-center" style={{height:'100px',fontWeight:'bold',fontSize:'25px',lineHeight:'100px',background:'-webkit-linear-gradient(left, #0072ff, #8811c5)'}}>
        <p>Announce Something</p>
      </div>
      <div className="form-content p-3">
        <div className="row">
            <div className="form-group">
                    <input
                    style={{borderRadius:'1.5rem',height:'200px'}}
                      type="text"
                      className="form-control "
                      id="message"
                      name="message"
                      placeholder="Write your message Here."
                      onChange={(e) => {
                        setNotice({ ...notice, message: e.target.value });
                      }}
                    />
            </div>
        <div className="text-center">
        <button type="submit" onClick={addNotice} className="btnSubmit p-3 m-3 bg-primary rounded text-white">Submit</button>
        <hr/>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default AddNotice