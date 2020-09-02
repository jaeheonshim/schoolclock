import React from "react";
import ReactDOM from "react-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import App from "./component/App";
import Paper from "@material-ui/core/Paper";

const rootElement = document.getElementById("root");
const darkTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>,
  rootElement
);
