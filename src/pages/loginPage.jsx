import React from "react";
import { useContext } from "react";
import AuthContext from "../context/authenticationContext";
import { Link } from "react-router-dom";
import Background from "./background.jpg";

import { ReactComponent as Eye } from "bootstrap-icons/icons/eye-fill.svg";
import { ReactComponent as Eye_Slash } from "bootstrap-icons/icons/eye-slash-fill.svg";

const loginstyle = {
  backgroundImage: `url(${Background})`,
};
const form = {
  backgroundColor: "rgb(252, 247, 247",
  borderRadius: "20px",
  marginBottom: "2rem",
  margin: "30px",
};

function LogInPage(props) {
  const { logIn } = useContext(AuthContext);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <div
      className="container-fluid h-100 d-flex align-items-center justify-content-center"
      style={loginstyle}
    >
      {/* <div className="row"> */}
      <div className="col-md-6 col-lg-4 col-10 mx-auto">
        <div className="login-form bg-light mt-4 p-4" style={form}>
          <form onSubmit={logIn} action="" method="" className="row g-3">
            <h4 className="text-center font-bold">Welcome</h4>
            <hr className="m-2" />
            <div className="col-12 p-2">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control p-2"
                placeholder="Username"
              />
            </div>
            <div className="input-group">
              <div className="col-12 p-2">
                <label>Password</label>
                <input
                  type={values.showPassword ? "text" : "password"}
                  name="password"
                  className="form-control p-2"
                  placeholder="Password"
                />
                <span className="input-group-addon">
                  <button onClick={handleClickShowPassword}>
                    {values.showPassword ? <Eye /> : <Eye_Slash />}{" "}
                  </button>
                </span>
              </div>
            </div>
            <div className="col-12 p-2">
              <button type="submit" className="btn btn-dark float-end">
                Login
              </button>
            </div>
            <div className="col-12">
              <small className="mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </small>
            </div>
          </form>
          <hr className="mt-4" />
        </div>
        {/* </div> */}
      </div>
    </div>
    // <div className="container h-100 d-flex align-items-center justify-content-center" style={loginstyle}>
    //   <form onSubmit={logIn} style={form}>
    //     <div className="form-group">
    //       <label htmlFor="exampleInputEmail1">Username or Email</label>
    //       <input
    //         type="text"
    //         className="form-control p-2"
    //         name="username"
    //         id="exampleInputEmail1"
    //         aria-describedby="emailHelp"
    //         placeholder="Enter email or Username"
    //       />
    //       <small id="emailHelp" className="form-text text-muted">
    //         We'll never share your email with anyone else.
    //       </small>
    //     </div>
    //     <div className="form-group">
    //     <div className="input-group">
    //         <input
    //         type={values.showPassword ? "text" : "password"}
    //         className="form-control p-2"
    //         id="exampleInputPassword1"
    //         name="password"
    //         placeholder="Password"
    //       />
    //         <span className="input-group-addon ">
    //         <button onClick={handleClickShowPassword}>{values.showPassword? <Eye />: <Eye_Slash/>} </button>
    //         </span>
    //       </div>
    //     </div>
    //     <button type="submit" className="btn btn-primary p-2 mt-2 btn-block">
    //       Submit
    //     </button>
    //     <div className="form-group">
    //     <small className="mt-2">Don't have an account? <Link to="/signup">Sign Up</Link></small>
    //     </div>
    //   </form>
    // </div>
  );
}

export default LogInPage;
