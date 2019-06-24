import React from "react";
import Routes from "./routes";
import { NavLink, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="body-wrapper">
      <BrowserRouter>
        <div className="row">
          <div className="col-3 col-lg-2 d-flex">
            <ul className="menu">
              <li>
                <NavLink
                  to="/form"
                  className="menu__item"
                  activeClassName="menu__item--active"
                >
                  Form
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tabs"
                  className="menu__item"
                  activeClassName="menu__item--active"
                >
                  Tabs
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-9 mt-30">
            <Routes />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
