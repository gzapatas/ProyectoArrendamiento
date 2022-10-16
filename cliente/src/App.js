import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainView from "./views/MainView";
import Configuration from './configuration/configuration';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path = {`${Configuration.PROJECT_LOCATION}`} component={MainView} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;