import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";
import MainComponent from "./Page";
import { Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <CssBaseline />
        <MainComponent />
      </Fragment>
    </Provider>
  );
};

export default App;
