//React imports
import React from "react";

//Redux imports
import { Provider } from "react-redux";

//React-router
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { store } from "../app/store";

//My components
import Login from "./login/Login";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
