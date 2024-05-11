import React, { useContext, useState, useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { ViewPanel, LeftPanel, RightPanel } from "../components/viewPanel";
import { NavBar, NavItem, NavBrand, NavBarTop } from "../components/navBar";
import {
  ButtomGrid,
  MiddleGrid,
  UpperGrid,
  TOP_LEFTGRID,
  TOP_RIGHTGRID,
  Top_MIDDLEGRID,
} from "../components/navBar";
import ProtectedRoutes from "../components/protectedRoutes";
import AuthContext from "../context/authenticationContext";

import HomePage from "./homePage";
import logo from "./Images/logo1.png";
import LogInPage from "./loginPage";
import LogOutPage from "./logoutPage";
import NotFoundPage from "./notfoundPage";
import ProfilePage from "./profilepage";
import SignupPage from "./signuppage";
import Department from "./department";
import Departmentview from "./departmentview";
import { McqQuestionsPage, McqQuestionCreationPage } from "./mcqquestionPage";

import ViewCourse from "./viewcourse";
import AddNotice from "./addnotice";
import AssignmentPage from "./assignmentpage";
import GradeView from "./gradeView";
import StudentAssignmentView from "./studentassignmentview";

import { ReactComponent as ListIcon } from "bootstrap-icons/icons/list.svg";
import { ReactComponent as HomeIcon } from "bootstrap-icons/icons/house.svg";
import { ReactComponent as BoxArrowInLeftIcon } from "bootstrap-icons/icons/box-arrow-in-left.svg";
import { ReactComponent as BoxArrowInRightIcon } from "bootstrap-icons/icons/box-arrow-in-right.svg";
import { ReactComponent as PersonIcon } from "bootstrap-icons/icons/person.svg";
import { ReactComponent as CoursesIcon } from "bootstrap-icons/icons/layers.svg";
import { ReactComponent as PeopleIcon } from "bootstrap-icons/icons/people.svg";
import { ReactComponent as AnnouncementIcon } from "bootstrap-icons/icons/megaphone-fill.svg";
import CircleAnimation from "../components/circleAnimation";
import { ProtectedRoutesStaff } from "../components/protectedRoutes";
import { ProtectedRoutesTeacher } from "../components/protectedRoutes";
import { ProtectedRoutesStudent } from "../components/protectedRoutes";
import TakeExam from "./takeexam";
import StartExam from "./startexam";
import AddExam from "./addexam";
import CreateCourse from "./createcourse";
import CourseDetailView from "./coursedetailview";
import CreateExam from "./createexam";

import API from "../context/apiContext";
import { ErrorProvider } from "../context/errorContext";
import McqCards from "../components/mcqCards";
import McqPage from "./mcqPage";
import AssignmentViewPage from "./assignmentviewpage";
import AssignmentGrade from "./assignmentgrade";
import MCQGrade from "./mcqgrade";
import AssignmentGradeView from "./assignmentgradeview";
import McqGradeView from "./mcqgradeview";

function RoutesComponent(props) {
  const { user, authToken } = useContext(AuthContext);
  const [usern, setUsername] = useState(null);
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
        })
        .catch((error) => {});
    }
  }, [user, authToken]);

  return (
    <ViewPanel>
      <LeftPanel>
        <NavBar>
          <UpperGrid>
            <NavBrand>
              {/* <h2>SMS</h2> */}
              <img
                src={logo}
                alt="logo"
                className="img-fluid rounded w-75 m-4"
              />
            </NavBrand>
          </UpperGrid>
          <MiddleGrid>
            <ul className="navbar-nav">
              <NavItem
                icon={<HomeIcon />}
                activeclassName=""
                name="Home"
                link="/"
              />
              {usern && (
                <NavItem
                  icon={<PeopleIcon />}
                  name="Administration"
                  link="/admin"
                  activeclassName=""
                />
              )}
              {usern && usern.usertype === "teacher" && (
                <NavItem
                  icon={<PeopleIcon />}
                  name="add_Exam"
                  link="/addexam"
                  activeclassName=""
                />
              )}

              <NavItem
                icon={<PeopleIcon />}
                name="Course"
                link="/course"
                activeclassName=""
              />

              {usern && usern.usertype === "student" && (
                <NavItem
                  icon={<PeopleIcon />}
                  name="Take Exam"
                  link="/takeexam"
                  activeclassName=""
                />
              )}
              <NavItem
                icon={<PeopleIcon />}
                name="Departments"
                link="/department"
                activeclassName=""
              />
            </ul>
          </MiddleGrid>
          <ButtomGrid>
            <ul className="navbar-nav">
              <NavItem
                // icon={<PersonIcon />}
                icon={
                  user && usern && usern.image_url != null ? (
                    <img
                      src={usern.image_url}
                      alt="profilepic"
                      className="rounded-circle"
                      width="35px"
                    />
                  ) : (
                    <PersonIcon />
                  )
                }
                name={user && usern ? usern.username : "Guest"}
                link={user ? "/profile" : "/login"}
                activeclassName=""
              />
              <NavItem
                icon={user ? <BoxArrowInLeftIcon /> : <BoxArrowInRightIcon />}
                name={user ? "Log Out" : "Log In"}
                link={user ? "/logout" : "/login"}
                activeclassName=""
              />
            </ul>
          </ButtomGrid>
        </NavBar>
      </LeftPanel>
      <RightPanel>
        <NavBarTop>
          <TOP_LEFTGRID>
            <ListIcon
              style={{
                left: "0px",
              }}
              onClick={(event) => {
                let leftpanel = document.getElementById("left-panel");
                leftpanel.classList.toggle("d-none");
                event.currentTarget.style.setProperty(
                  "left",
                  `${leftpanel.clientWidth}px`
                );
              }}
              className="d-md-none ham-menu"
            />
            <NavBrand>
              <h2>SMS</h2>
              {/* <img src={logo} alt="logo" className="img-fluid" /> */}
            </NavBrand>
          </TOP_LEFTGRID>
          <Top_MIDDLEGRID></Top_MIDDLEGRID>
          <TOP_RIGHTGRID>
            <ul className="navbar pe-3">
              {usern && usern.usertype === "staff" && (
                <NavItem
                  icon={<AnnouncementIcon />}
                  link="/notice"
                  activeclassName=""
                />
              )}
              <NavItem
                // icon={<PersonIcon />}
                icon={
                  user && usern && usern.image_url != null ? (
                    <img
                      src={usern.image_url}
                      alt="profilepic"
                      className="rounded-circle"
                      width="35px"
                    />
                  ) : (
                    <PersonIcon size="lg" />
                  )
                }
                // name={user && usern ? usern.first_name : "Guest"}
                link={user ? "/profile" : "/login"}
                activeclassName=""
              />
              {/* <ul className="navbar-nav">
            <Top_MIDDLEGRID></Top_MIDDLEGRID>
            <TOP_RIGHTGRID>
              <ul className="navbar pe-3">
                <NavItem
                  icon={<MessageIcon />}
                  link="/message"
                  activeclassName=""
                />
                <NavItem
                  // icon={<PersonIcon />}
                  icon={
                    user && usern && usern.image_url != null ? (
                      <img
                        src={usern.image_url}
                        alt="profilepic"
                        className="rounded-circle"
                        width="35px"
                      />
                    ) : (
                      <PersonIcon size="lg" />
                    )
                  }
                  // name={user && usern ? usern.first_name : "Guest"}
                  link={user ? "/profile" : "/login"}
                  activeclassName=""
                />
                {/* <ul className="navbar-nav">
                <NavItem
                icon={<PersonIcon/>}
                link="/message"
                name="Profile"
                activeclassName=""
              />
              <NavItem
                icon={<MessageIcon/>}
                link="/Settings"
                name="Settings"
                activeclassName=""
              />
                <NavItem
                  icon={<BoxArrowInLeftIcon />}
                  link="/message"
                  name="Log Out"
                  activeclassName=""
                />
              </ul> */}
            </ul>
          </TOP_RIGHTGRID>
        </NavBarTop>
        <CircleAnimation delay={1000} />
        <ErrorProvider>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route
              path="/mcqquestion/:courseid/:mcqid"
              element={
                usern && usern.usertype === "teacher" ? (
                  <McqQuestionCreationPage user={usern} />
                ) : (
                  <McqQuestionsPage user={usern} />
                )
              }
            />
            <Route path="/mcq/:id" element={<McqPage user={usern} />} />

            {!user && <Route path="/signup" element={<SignupPage />} />}
            {!user && <Route path="/login" element={<LogInPage />} />}
            <Route element={<ProtectedRoutes user={user} />}>
              <Route path="/logout" element={<LogOutPage user={usern} />} />
              <Route path="/course" element={<ViewCourse user={usern} />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/department" element={<Department />} />
              <Route
                path="/course/:id"
                element={<CourseDetailView user={usern} />}
              ></Route>
              <Route
                path="/assignment/:courseid/:assignmentid"
                element={<AssignmentViewPage user={usern} />}
              />
              <Route
                path="/assignment/:id"
                element={<AssignmentPage user={usern} />}
              />
              <Route
                path="/studentassignmentview/:courseid/:assignmentid"
                element={<StudentAssignmentView user={usern} />}
              />
              <Route path="/grades/:id" element={<GradeView user={usern} />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="department" element={<Department />} />
              <Route element={<ProtectedRoutesStaff user={usern} />}>
                <Route path="/notice" element={<AddNotice user={usern} />} />
              </Route>
              <Route element={<ProtectedRoutesTeacher user={usern} />}>
                <Route path="addexam" element={<AddExam user={usern} />} />
                <Route
                  path="/createexam/:id"
                  element={<CreateExam user={usern} />}
                />
                <Route path="/assignmentgrade/:id" element={<AssignmentGrade user={usern} />} />
                <Route path="/assignmentgradeview/:courseid/:assignmentid" element={<AssignmentGradeView user={usern} />} />
                <Route path="/mcqgradeview/:courseid/:mcqid" element={<McqGradeView user={usern} />} />
                <Route path="/mcqgrade/:id" element={<MCQGrade user={usern} />} />
              </Route>
              <Route element={<ProtectedRoutesStudent user={usern} />}>
                <Route path="takeexam" element={<TakeExam user={usern} />} />
                <Route path="startexam" element={<StartExam user={usern} />} />
              </Route>
              <Route
                path="/department/:name"
                element={<Departmentview />}
              ></Route>
              <Route path="logout" element={<LogOutPage user={usern} />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorProvider>
      </RightPanel>
    </ViewPanel>
  );
}

export default RoutesComponent;
