import React from "react";
import { Link } from "react-router-dom";

const TakeExam = () => {
  return (
    <div className="container-fluid my-4">
      <div className="mt-4 p-3 bg-light rounded">
        <h3 className="text-success text-center">
          Before you start the Exam, here are the rules
        </h3>
        <div className="row">
          <div className="card border-info mx-4 my-4">
            <div className="card-body p-4 text-secondary">
              <h4 className="card-title">Exam Details :</h4>
              <p className="card-text"></p>
              <ul style={{ listStyle: "decimal" }}>
                <li>Exam Name : Exam 1</li>
                <li>Total Question : 10</li>
                <li>Total Marks : 20</li>
              </ul>
              <p></p>
              <h4 className="card-title mt-3">Rules :</h4>
              <p className="card-text"></p>
              <ul style={{ listStyle: "decimal" }}>
                <li>All questions are multiple choice question.</li>
                <li>
                  <span className="text-danger">
                    Exam will end as soon as the timer stops.
                  </span>
                </li>
                <li>Every question carry different marks</li>

                <li>Try to answer as quickly as you can.</li>
                <li>
                  If you press refresh or go back to the previous page, there
                  will be a new question for you and the question you were on
                  will be counted as attempted.
                </li>
                <li>Questions are displayed randomly for every user.</li>
                {/* <li>You will be told your marks immediately when you submit the answer.</li> */}
              </ul>
              <p></p>
              <Link to="/startexam" className="btn btn-success btn-lg mt-3">
                Let's Start
              </Link>
            </div>
            <div className="card-footer text-center">
              <h4>Best of Luck</h4>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default TakeExam;
