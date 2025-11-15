import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DataProvider from "./context/DataProvider";
import "./index.css";

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById("root")
);
