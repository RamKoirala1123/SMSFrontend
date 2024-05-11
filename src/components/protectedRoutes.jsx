import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes(props) {
  return props.user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;

function ProtectedRoutesTeacher(props) {
  if (props.user) {
    // props.user is null if user is not authenticaated
    return props.user.usertype === "teacher" ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  }
  return <Navigate to="/" />;
}

function ProtectedRoutesStaff(props) {
  if (props.user) {
    // props.user is null if user is not authenticaated
    return props.user.usertype === "staff" ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  }
  return <Navigate to="/" />;
}
function ProtectedRoutesStudent(props) {
  if (props.user) {
    // props.user is null if user is not authenticaated
    return props.user.usertype === "student" ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  }
  return <Navigate to="/" />;
}

export {ProtectedRoutesStaff, ProtectedRoutesTeacher, ProtectedRoutesStudent}

