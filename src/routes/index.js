import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FormContainer from "../containers/FormContainer";
import TabsContainer from "../containers/TabsContainer";
import HomeContainer from "../containers/HomeContainer";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomeContainer} />
      <Route path="/form" exact component={FormContainer} />
      <Route path="/tabs" exact component={TabsContainer} />
    </Switch>
  );
};

export default Routes;
