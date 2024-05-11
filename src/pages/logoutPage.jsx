import React from "react";
import { useContext } from "react";
import AuthContext from "../context/authenticationContext";

function LogoutPage(props) {
  const { logOut } = useContext(AuthContext);
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center h-100">
      <h3>Wanna Logout, {props.user.username}?</h3>
      <button onClick={logOut} className="btn btn-danger p-2 mt-2">
        LogOut
      </button>
    </div>
  );
}
export default LogoutPage;
