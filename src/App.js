import React from "react";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./components/css/mainWindow.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateMomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
import { AuthProvider } from "./context/authenticationContext";
import { ThemeProvider } from "./context/themeContext";

import RoutesComponent from "./pages/routesPage";
function App(props) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AuthProvider>
            <RoutesComponent />
          </AuthProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
