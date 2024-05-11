import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authenticationContext";
import API from "../context/apiContext";
import { DateTimePicker } from "@material-ui/pickers";
import pdf from "./Images/pdf/sample.pdf";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function AssignmentViewPage(props) {
  const { user, authToken } = useContext(AuthContext);
  const [assignment, setAssignment] = useState([]);
  const params = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(assignment)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function changePageBack() {
    changePage(-1);
  }
  function changePageNext() {
    changePage(+1);
  }
  const [file, setFile] = useState("");
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (user && authToken) {
      fetch(
        API +
          "course/" +
          params.courseid +
          "/assignment/" +
          params.assignmentid +
          "/",
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
          setAssignment(data);
        })
        .catch((error) => {});
    }
  }, [user, authToken]);

  function deleteassignment(event) {
    event.preventDefault();
    if (user && authToken) {
      fetch(
        API +
          "course/" +
          params.courseid +
          "/assignment/" +
          params.assignmentid +
          "/",
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + authToken.access,
          },
        }
      )
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          console.log(data);
        });
    }
  }

  function submitassignment(event){
    event.preventDefault();
    const formData = new FormData()
    formData.append("file",file)
    formData.append("username",props.user.username)
   formData.append("assignment_id", assignment.id)
    if(user && authToken) {
      fetch(API + "course/"+ params.courseid +"/assignment/" + params.assignmentid + "/student/", {
        method:"PUT",
        headers: {
          Authorization: "Bearer " + authToken.access,
        },
        body: formData,
      }
      ).then(function(response) {
        return response.text();
      }).then(function(data) {
        console.log(data);
      })
    }
    }

  return (
    <div className="container-fluid my-2">
      <div className="rounded">
        {/* <h3 className="text-success ">Course Assignment</h3> */}
        <div
          className="container-fluid  d-flex justify-content-between border-secondary border-bottom"
          style={{ background: "aqua" }}
        >
          <p className="text-success fs-4">{assignment.assignment_name}</p>
          {props.user && props.user.usertype === "student" && (
            // <button
            //   type="button"
            //   className="btn"
            // >
            //   <i className="bi bi-plus-lg"></i>
            //   Submit Assignment
            // </button>
            // <button onclick={submitassignment}>Submit</button>
            <div>
              <input
                type="file"
                name="profile_pic"
                label="Upload Profile Picture"
                onChange={(e)=> handleChange(e)}/>
               <button type="submit" onClick={submitassignment} className="btn btn-primary shadow">Submit</button>
              </div>
          )}
        </div>
        <div className="row">
          <div>
            <center>
              <Document
                file={{
                  url: "http://www.africau.edu/images/default/sample.pdf",
                }}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              {pageNumber > 1 && (
                <button onClick={changePageBack}>Previous Page</button>
              )}
              {pageNumber < numPages && (
                <button onClick={changePageNext}>Next Page</button>
              )}
            </center>
             
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentViewPage;
