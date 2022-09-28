import "./App.css";
import MainComponent from "./Page";
import { Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <MainComponent />
    </Fragment>
  );
};

export default App;
