import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";

const CreateExam = () => {
  const { user, authToken } = useContext(AuthContext);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  function createCourse(event) {
    event.preventDefault();
    if (user && authToken) {
      fetch(API + "course/" + params.id + "/mcq/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },
        body: JSON.stringify(exam),
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
          setExam(data);
        })
        .catch((error) => {});
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "blue" }}>ADD New Exam</h2>
      <form style={{ margin: "100px", marginTop: "0px" }}>
        <div className="form-group">
          <label for="exam_name">Exam Name</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="text"
            className="form-control "
            id="exam_name"
            name="exam_name"
            placeholder="Exam name"
            onChange={(e) => {
              setExam({ ...exam, name: e.target.value });
            }}
          />

          <label for="description">Description</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="text"
            className="form-control "
            id="description"
            name="description"
            placeholder="Description"
            onChange={(e) => {
              setExam({ ...exam, description: e.target.value });
            }}
          />
          <label for="total_marks">Start time</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="time"
            className="form-control "
            id="start_time"
            name="start_time"
            //   placeholder="Exam name"
            onChange={(e) => {
              setExam({ ...exam, start_time: e.target.value });
            }}
          />
          <label for="total_marks">End time</label>
          <input
            // style={{borderRadius:'1.5rem',height:'100px'}}
            type="time"
            className="form-control "
            id="start_time"
            name="start_time"
            //   placeholder="Exam name"
            onChange={(e) => {
              setExam({ ...exam, end_time: e.target.value });
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          ADD
        </button>
      </form>
      <br />
      <br />
      <br />
      <br />
    </div>
    //      <h1 className="text-danger mt-3">Simple Quiz App Using Python Django , Javascript and Jquery</h1>
    //     <hr>
    //     <div>
    //         {% for i in  exam %}
    //         <table>
    //             <tr>
    //                 <td className="text-primary">{{i.id}} ) {{i.Question}} ?</td>
    //             </tr>
    //             <tr>
    //                 <td><input type = "radio" className="rb" name = {{i.id}} id="Option1" value="{{i.Option1}}">{{i.Option1}}</td>
    //             </tr>
    //             <tr>
    //                 <td><input type = "radio" className="rb" name = {{i.id}} id="Option2" value="{{i.Option2}}">{{i.Option2}}</td>
    //             </tr>
    //             <tr>
    //                 <td><input type = "radio" className="rb" name = {{i.id}} id="Option3" value="{{i.Option3}}">{{i.Option3}}</td>
    //             </tr>
    //             <tr>
    //                 <td><input type = "radio" className="rb" name = {{i.id}} id="Option4" value="{{i.Option4}}">{{i.Option4}}</td>
    //             </tr>

    //             <tr>
    //                 <td><label id="corans" className= "rb" style="display:none ; color : green"><b>{{i.Corrans}}</b></label></td>
    //             </tr>

    //         </table>
    // <hr>

    //         {% endfor %}
    //         <input type="submit" className="btn btn-success" value="Submit" id="b1" onclick="getanswers()">
    //         <br>
    //         <b id="UserAnswers"></b>
    //         </div>
  );
};

export default CreateExam;
