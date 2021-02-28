import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import theme from "./components/General/Theme/Theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Provider } from 'react-redux';
import store from "./components/Pages/Chatroom/app/store";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />

      <Provider store={store}>
          <App />
        </Provider>
        
    </React.Fragment>
  </MuiThemeProvider>,
  document.getElementById("root")
);
