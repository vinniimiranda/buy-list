import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import ptLocale from "date-fns/locale/pt-BR";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router } from "react-router";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import history from "./services/history";
import Routes from "./routes/index";


const ThemeContext = () => {
  const prefersDarkMode = true;
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: prefersDarkMode ? "#00B0FF" : "#00BFA6",
          },
          secondary: {
            main: prefersDarkMode ? "#00B0FF" : "#00B0FF",
          },
          background: {
            default: prefersDarkMode ? "#121212" : "#FAFAFA",
            paper: prefersDarkMode ? "#1f1f1f" : "#EEE",
          },
          text: {
            primary: prefersDarkMode ? "#FFF" : "#666",
            secondary: prefersDarkMode ? "#FFF" : "#999",
          },
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
        <Router history={history}>
          <Routes />
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

function App () {
  return (
    <ThemeContext />
  );
}

export default App;
