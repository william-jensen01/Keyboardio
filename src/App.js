import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import PostsDashboard from "./components/Posts/PostsDashboard";
import Faq from "./components/FAQ";
import PageNotFound from "./components/PageNotFound";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* header is constant so we don't have to import it in every component */}
      <Header />
      <div className="app">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/posts/:dateType/:postType" component={PostsDashboard} />
          <Route path="/faq" component={Faq} />

          {/* if the url doesn't match a path provided, show the 404 page not found */}
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
