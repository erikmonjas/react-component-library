import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FormContainer from "../containers/FormContainer";
import TabsContainer from "../containers/TabsContainer";
import HomeContainer from "../containers/HomeContainer";
import Logo from "../logo.svg";

const Routes = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const getWidth = useCallback(() => {
    return setWidth(window.innerWidth);
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      getWidth();
    });
  }, [getWidth]);

  return (
    <>
      {width > 768 ? (
        <Switch>
          <Route path="/" exact component={HomeContainer} />
          <Route path="/form" exact component={FormContainer} />
          <Route path="/tabs" exact component={TabsContainer} />
        </Switch>
      ) : (
        <div className="under-width">
          <div className="under-width__inner">
            <img src={Logo} alt="logo" className="home-logo" />
            <p className="pb-20">
              Your current screen size is {window.innerWidth}px
            </p>
            <p>
              Screen size must be over 768px to properly view this page. Try
              rotating your device or accessing the page from another one.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Routes;
