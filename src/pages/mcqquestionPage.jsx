import React, { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { ReactComponent as InsertIcon } from "bootstrap-icons/icons/plus-lg.svg";

import { ReactComponent as AnsweredIcon } from "bootstrap-icons/icons/check.svg";

function QuestionsComponent({ updateQuestion, ...props }) {
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        updateQuestion(props.quest);
      }}
      style={{ cursor: "pointer" }}
      className={
        "p-2 ms-1 mw-25 mh-25 d-flex align-items-center justify-content-center font-weight-bold border border-primary rounded-circle " +
        props?.styleName
      }
    >
      <p className="text-xl ">{props.quest.index}</p>
      <AnsweredIcon className="text-success ps-2 w-100 h-100" />
    </div>
  );
}

function McqQuestionsPage(props) {
  const { user, authToken } = useContext(AuthContext);
  const [time, setTime] = useState({ start_time: "", end_time: "" });
  const [question, setQuestion] = useState([]);
  const [presentQuestion, setPresentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState(null);
  const params = useParams();

  const submitAnswer = (event) => {
    event.preventDefault();
    fetch(
      API +
        "course/" +
        params.courseid +
        "/mcq/" +
        params.mcqid +
        "/questions/" +
        presentQuestion.id +
        "/" +
        props.user.username +
        "/",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },
        body: JSON.stringify(answer),
      }
    )
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
        setAnswer(data);
      })
      .catch((err) => {});
  };
  const getStudentAnswer = useCallback(() => {
    if (user && authToken) {
      fetch(
        API +
          "course/" +
          params.courseid +
          "/mcq/" +
          params.mcqid +
          "/questions/" +
          presentQuestion.id +
          "/" +
          props.user.username +
          "/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + authToken.access,
          },
        }
      )
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
          setAnswer(data);
        })
        .catch((err) => {});
    }
  }, [authToken, params, props, presentQuestion, user]);

  const handleAnswer = (data) => {
    setPresentQuestion(data);
    getStudentAnswer();
  };

  const updateQuestion = useCallback(() => {
    fetch(API + "course/" + params.courseid + "/mcq/" + params.mcqid + "/", {
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
        setTime({
          start_time: data.start_time,
          end_time: data.end_time,
          elapsed_time: "",
        });
        setQuestion(data.mcq_questions);
        setPresentQuestion(question.length > 0 ? question[0] : null);
        getStudentAnswer();
        setLoading(false);
      })
      .catch((error) => {});
  }, [authToken, params, question, getStudentAnswer]);

  const updateTime = useCallback(() => {
    const update = setInterval(() => {
      let elapsedtime = new Date(time.end_time) - new Date();
      if (elapsedtime > 0) {
        let hours = Math.floor(elapsedtime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedtime / (1000 * 60)) % 60;
        let seconds = Math.floor(elapsedtime / 1000) % 60;
        setTime({
          ...time,
          elapsed_time: `${hours}h ${minutes}m ${seconds}s rem`,
        });
      } else {
        clearInterval(update);
        setTime({ ...time, elapsed_time: "Exam is over" });
      }
    }, 1000);
  }, [time]);

  useEffect(() => {
    if (user && authToken && loading) {
      updateQuestion();
      updateTime();
    }
  }, [updateQuestion, user, authToken, loading, updateTime]);
  return (
    <>
      {!loading ? (
        <div className="container p-5">
          <div className="container-fluid mb-4">
            <h2 className="text-center text-info">MCQ Name</h2>
          </div>
          <div>
            <div className="container-fluid border-bottom border-success d-flex justify-content-between ">
              <p>
                {presentQuestion?.index}. {presentQuestion?.question}
              </p>
              <p>Marks: {presentQuestion?.marks}</p>
            </div>
            <div className="container-fluid">
              <div className="d-grid my-2">
                <div className="row py-2">
                  <div className="col-6">
                    <input
                      type="radio"
                      name="answer"
                      value="1"
                      checked={answer?.answer === 1}
                      onChange={(event) => {
                        event.preventDefault();
                        setAnswer({ ...answer, answer: 1 });
                      }}
                    />
                    <label htmlFor="option1" className="ps-2">
                      {presentQuestion?.options?.option1}
                    </label>
                  </div>

                  <div className="col-6">
                    <input
                      type="radio"
                      name="answer"
                      value="2"
                      checked={answer?.answer === 2}
                      onChange={(event) => {
                        event.preventDefault();
                        setAnswer({ ...answer, answer: 2 });
                      }}
                    />
                    <label htmlFor="option2" className="ps-2">
                      {presentQuestion?.options?.option2}
                    </label>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-6">
                    <input
                      type="radio"
                      name="answer"
                      value="3"
                      checked={answer?.answer === 3}
                      onChange={(event) => {
                        event.preventDefault();
                        setAnswer({ ...answer, answer: 3 });
                      }}
                    />
                    <label htmlFor="option3" className="ps-2">
                      {presentQuestion?.options?.option3}
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="radio"
                      name="answer"
                      value="4"
                      checked={answer?.answer === 4}
                      onChange={(event) => {
                        event.preventDefault();
                        setAnswer({ ...answer, answer: 4 });
                      }}
                    />
                    <label htmlFor="option4" className="ps-2">
                      {presentQuestion?.options?.option4}
                    </label>
                  </div>
                </div>
                <div className="row ms-auto">
                  <button
                    onClick={submitAnswer}
                    className="btn btn-success p-1"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid border mt-4 d-flex flex-wrap">
            {question &&
              question.map((ques) => {
                return (
                  <QuestionsComponent
                    updateQuestion={handleAnswer}
                    key={ques.id}
                    quest={ques}
                    styleName={
                      ques.id === presentQuestion?.id ? "bg-success" : ""
                    }
                  />
                );
              })}
          </div>
          <div className="container-fluid border mt-4 d-grid">
            <div className="row">
              <div className="col-4">
                <p>Start Time</p>
                <p>{new Date(time.start_time).toLocaleTimeString()}</p>
              </div>
              <div className="col-4">
                <p>End Time</p>
                <p>{new Date(time.end_time).toLocaleTimeString()}</p>
              </div>
              <div className="col-4">
                <p>Elapsed Time</p>
                <p>{time.elapsed_time}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
}

function McqQuestionCreationPage(props) {
  const { user, authToken } = useContext(AuthContext);
  const [question, setQuestion] = useState([]);
  const [presentQuestion, setPresentQuestion] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const updateQuestions = useCallback(() => {
    fetch(
      API +
        "course/" +
        params.courseid +
        "/mcq/" +
        params.mcqid +
        "/questions/",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authToken.access,
        },
      }
    )
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
        setQuestion(data);
        setPresentQuestion(question.length > 0 ? question[0] : null);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [authToken, params.courseid, params.mcqid, question]);

  const handleSubmit = (event) => {
    var endpoint =
      API +
      "course/" +
      params.courseid +
      "/mcq/" +
      params.mcqid +
      "/questions/";
    if (presentQuestion?.id !== undefined) {
      endpoint += presentQuestion.id + "/";
    }
    console.log(presentQuestion, endpoint);
    event.preventDefault();
    fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authToken.access,
      },
      body: JSON.stringify(presentQuestion),
    })
      .then(
        (response) =>
          new Promise((resolve, reject) => {
            if (response.status === 201) {
              resolve(response.json());
            } else {
              reject(response.status);
            }
          })
      )
      .then((data) => {
        setLoading(true);
        updateQuestions();
      })
      .catch((error) => {});
  };
  const deleteQuestion = (event) => {
    event.preventDefault();
    fetch(
      API +
        "course/" +
        params.courseid +
        "/mcq/" +
        params.mcqid +
        "/questions/" +
        presentQuestion.id +
        "/",
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + authToken.access,
        },
      }
    )
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
      .then(() => {
        setLoading(true);
        updateQuestions();
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (loading) {
      if (user && authToken) {
        updateQuestions();
      }
    }
  }, [
    user,
    authToken,
    params.courseid,
    params.mcqid,
    question,
    loading,
    updateQuestions,
  ]);
  return (
    <>
      {" "}
      {!loading && (
        <div className="container d-flex flex-column p-4 m-auto align-items-center justify-content-center">
          <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="container-fluid mb-4">
              <h2 className="text-center text-info">MCQ</h2>
            </div>
            <div className="container-fluid border-bottom border-success d-flex justify-content-between pb-2">
              <div className="container me-1 w-75 d-flex flex-start">
                <label className="m-1" htmlFor="question">
                  Question:
                </label>
                <textarea
                  className="p-1 rounded"
                  name="question"
                  cols="90"
                  rows="3"
                  onChange={(event) => {
                    setPresentQuestion({
                      ...presentQuestion,
                      question: event.target.value,
                    });
                  }}
                  value={presentQuestion ? presentQuestion.question : ""}
                ></textarea>
              </div>
              <div className="container ms-md-4">
                <label htmlFor="marks" className="me-2">
                  Marks:
                </label>
                <input
                  style={{ width: "40px" }}
                  type="number"
                  placeholder="1"
                  name="marks"
                  onChange={(event) => {
                    setPresentQuestion({
                      ...presentQuestion,
                      marks: event.target.value,
                    });
                  }}
                  value={presentQuestion ? presentQuestion.marks : ""}
                  min="0"
                  max="5"
                />
                <br />
                <label htmlFor="index" className="m-2">
                  Index:
                </label>
                <input
                  style={{ width: "40px" }}
                  type="number"
                  placeholder="0"
                  value={presentQuestion ? presentQuestion.index : ""}
                  onChange={(event) => {
                    setPresentQuestion({
                      ...presentQuestion,
                      index: event.target.value,
                    });
                  }}
                  name="index"
                  min="0"
                />
                <br />
                <label htmlFor="answer">Answer</label>
                <select
                  onChange={(event) => {
                    setPresentQuestion({
                      ...presentQuestion,
                      answer: event.target.value,
                    });
                  }}
                  value={presentQuestion ? presentQuestion.answer : ""}
                  className="p-1 ms-1"
                  name="answer"
                  id="answer"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <div className="container-fluid">
              <div className="d-grid my-2">
                <div className="row py-2">
                  <div className="col-6">
                    <label htmlFor="option1" className="ps-2 me-2">
                      1.
                    </label>
                    <input
                      className="p-1 rounded"
                      type="text"
                      name="option1"
                      placeholder="option1"
                      onChange={(event) => {
                        var options = {
                          ...presentQuestion?.options,
                          option1: event.target.value,
                        };
                        setPresentQuestion({
                          ...presentQuestion,
                          options: options,
                        });
                      }}
                      value={
                        presentQuestion ? presentQuestion.options?.option1 : ""
                      }
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="option2" className="ps-2 me-2">
                      2.
                    </label>
                    <input
                      className="p-1 rounded"
                      type="text"
                      name="option2"
                      placeholder="option2"
                      onChange={(event) => {
                        var options = {
                          ...presentQuestion?.options,
                          option2: event.target.value,
                        };
                        setPresentQuestion({
                          ...presentQuestion,
                          options: options,
                        });
                      }}
                      value={
                        presentQuestion ? presentQuestion.options?.option2 : ""
                      }
                    />
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-6">
                    <label htmlFor="option3" className="ps-2 me-2">
                      3.
                    </label>
                    <input
                      className="p-1 rounded"
                      type="text"
                      name="option3"
                      value={
                        presentQuestion ? presentQuestion.options?.option3 : ""
                      }
                      onChange={(event) => {
                        var options = {
                          ...presentQuestion?.options,
                          option3: event.target.value,
                        };
                        setPresentQuestion({
                          ...presentQuestion,
                          options: options,
                        });
                      }}
                      placeholder="option3"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="option4" className="ps-2 me-2">
                      4.
                    </label>
                    <input
                      className="p-1 rounded"
                      type="text"
                      name="option4"
                      onChange={(event) => {
                        var options = {
                          ...presentQuestion?.options,
                          option4: event.target.value,
                        };
                        setPresentQuestion({
                          ...presentQuestion,
                          options: options,
                        });
                      }}
                      value={
                        presentQuestion ? presentQuestion.options?.option4 : ""
                      }
                      placeholder="option4"
                    />
                  </div>
                </div>
                <div className="row ms-auto">
                  <button
                    onClick={deleteQuestion}
                    className={`btn btn-danger p-1 mb-2 ${
                      question &&
                      question.find(
                        (element) => element.id === presentQuestion?.id
                      )
                        ? ""
                        : "disabled"
                    }`}
                  >
                    Delete
                  </button>
                  <button className="btn btn-success p-1" type="submit">
                    {question &&
                    question.find(
                      (element) => element.id === presentQuestion?.id
                    )
                      ? "Update"
                      : "Submit"}
                  </button>
                </div>
              </div>
            </div>
            <div className="container-fluid border mt-4 d-flex flex-wrap">
              {question.map((ques) => {
                return (
                  <QuestionsComponent
                    updateQuestion={setPresentQuestion}
                    key={ques.index}
                    quest={ques}
                    styleName={
                      presentQuestion && presentQuestion.id === ques.id
                        ? "bg-success"
                        : ""
                    }
                  />
                );
              })}

              <div
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                  event.preventDefault();
                  setPresentQuestion({
                    mcq: params.mcqid,
                    question: "",
                    index: question.length + 1,
                    marks: "",
                    answer: "1",
                    options: {
                      option1: "",
                      option2: "",
                      option3: "",
                      option4: "",
                    },
                  });
                }}
                className="p-2 ms-1 mw-25 mh-25 d-flex align-items-center justify-content-center font-weight-bold border border-primary rounded-circle bg-primary "
              >
                <p className="text-dark h-100 w-100">
                  <InsertIcon />
                </p>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export { McqQuestionsPage, McqQuestionCreationPage };
