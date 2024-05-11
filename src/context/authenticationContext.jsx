import React from "react";
import { createContext, useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import API from "./apiContext";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthTokens] = useState(() =>
    localStorage.getItem("authtokens")
      ? JSON.parse(localStorage.getItem("authtokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authtokens")
      ? jwt_decode(JSON.parse(localStorage.getItem("authtokens")).access)
      : null
  );
  const navigate = useNavigate();

  const logIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API + "login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
        }),
      });
      if (!response.ok) {
        throw new Error(response.data);
      }
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("authtokens", JSON.stringify(data));
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        navigate("/");
      } else {
        alert("error");
      }
    } catch (err) {
      alert("Invalid Username or Password.")
      console.log(err.response)
    }
  };

  const logOut = useCallback(async () => {
    // console.log("logout");
    localStorage.removeItem("authtokens");
    setAuthTokens(null);
    setUser(null);
    navigate("/login");
  }, [navigate, setUser, setAuthTokens]);

  const updateToken = useCallback(async () => {
    try {
      const response = await fetch(API + "token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authToken?.refresh }),
      });
      if (!response.ok) {
        throw new Error("Token Refresh Failed");
      }
      if (response.status === 200) {
        const data = await response.json();
        setAuthTokens({ refresh: authToken.refresh, access: data.access });
        setUser(jwt_decode(data.access));
        localStorage.setItem(
          "authtokens",
          JSON.stringify({ refresh: authToken.refresh, access: data.access })
        );
      }
    } catch (err) {
      // console.error(err);
      logOut();
    }
    if (loading) {
      setLoading(false);
    }
  }, [loading, authToken, logOut]);

  let contextData = {
    user: user,
    logIn: logIn,
    logOut: logOut,
    authToken: authToken,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fiveMinutes = 1000 * 60 * 5;

    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, fiveMinutes);
    return () => clearInterval(interval);
  }, [authToken, loading, updateToken]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
