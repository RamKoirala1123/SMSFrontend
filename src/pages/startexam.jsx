import React from "react";
import TakeExam from "./takeexam";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";

const StartExam = () => {
  return (
    <h1>startExam</h1>

    //   <div className="jumbotron my-4">

    // <form className="form" autocomplete="off" onsubmit="return saveAns()"  action="/student/calculate-marks" method="POST">
    //   {/* {% csrf_token %} */}
    //   {/* <h1 style="text-align: center;">{{course.course_name}}</h1> */}
    //   <h1 className="text-center"></h1>
    //   {/* {% for q in questions%} */}
    //   {/* <h3 className="text-info">{{ forloop.counter }}. {{q.question}}</h3><h4 style="text-align: right;">[Marks {{q.marks}}]</h4> */}
    //   <h3 className="text-info"></h3><h4 ></h4>
    //       {/* <input type="hidden" name="csrfmiddlewaretoken" value="C24rUotmdHawVQJL3KrqiWxvti8UffOFYUc8TRbZtLt36AVLdP3jbkzUVe3beRAa"/> */}
    //         <div className="form-check mx-4">
    //           <input className="form-check-input" type="radio" name="{{ forloop.counter }}" id="{{q.option1}}" value="Option1"/>
    //           <label className="form-check-label" for="option1">
    //             {/* {{q.option1}} */}
    //           </label>
    //         </div>

    //         <div className="form-check mx-4">
    //           <input className="form-check-input" type="radio" name="{{ forloop.counter }}" id="{{q.option2}}" value="Option2"/>
    //           <label className="form-check-label" for="option2">
    //             {/* {{q.option2}} */}
    //           </label>
    //         </div>

    //         <div className="form-check mx-4">
    //           <input className="form-check-input" type="radio" name="{{ forloop.counter }}" id="{{q.option3}}" value="Option3"/>
    //           <label className="form-check-label" for="option3">
    //             {/* {{q.option3}} */}
    //           </label>
    //         </div>

    //         <div className="form-check mx-4">
    //           <input className="form-check-input" type="radio" name="{{ forloop.counter }}" id="{{q.option4}}" value="Option4"/>
    //           <label className="form-check-label" for="option4">
    //             {/* {{q.option4}} */}
    //           </label>
    //         </div>

    //       {/* {% endfor %} */}
    //       <input className="btn btn-info btn-lg"   type="submit" value="Submit"/>
    //   </form>
    // </div>
  );
};

export default StartExam;
