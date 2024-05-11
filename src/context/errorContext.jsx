import React, { createContext, useEffect, useState } from "react";

const ErrorContext = createContext();

function ErrorProvider(props) {
  const [error, setError] = useState(null);

  const contextObj = {
    setError: setError,
  };
  useEffect(() => {
    const errorset = () => {
      setError(null);
    };
    if (error) {
      setTimeout(errorset, 4 * 1000);
    }
  });
  if (error) {
    return (
      <ErrorContext.Provider value={contextObj}>
        <div
          style={{ top: "0%", zIndex: "10" }}
          className="position-absolute p-2 w-50 bg-dark d-grid align-items-center justify-content-center"
        >
          <p className="text-warning"> {error} </p>
        </div>
        {props.children}
      </ErrorContext.Provider>
    );
  } else {
    return (
      <ErrorContext.Provider value={contextObj}>
        {props.children}
      </ErrorContext.Provider>
    );
  }
}

export default ErrorContext;
export { ErrorProvider };
