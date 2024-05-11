import React, { createContext, useState } from "react";
const LightTheme = {
  backgroundColor: "#f5f5f5",
  color: "#333",
  backgrnd: "bg-dark", //can also be used as a className
};

const DarkTheme = {
  backgroundColor: "#f5f5f5",
  color: "#333",
  backgrnd: "bg-dark", //can also be used as a className where bg dark is boostrap class name
};

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [theme, setTheme] = useState();

  const toggleTheme = (theme) => {
    setTheme(theme === 1 ? LightTheme : DarkTheme);
  };
  let contextData = {
    theme: theme,
    toggleTheme: toggleTheme,
  };
  return (
    <ThemeContext.Provider value={contextData}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
export { ThemeProvider };
