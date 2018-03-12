import React from "react";
import dva from "dva";
import { Router, Switch, Redirect } from "dva/router";
import Route from "react-router-hooks";
import PropTypes from "prop-types";
import dynamic from "dva/dynamic";

import weixin from "@/utils/weixin";
import logger from "@/utils/logger";
import Error from "./routes/Error";
import ProxyLoginComponent from "./routes/ProxyLogin";
import LoginComponent from "./routes/Login";
import BindComponent from "./routes/Bind";

const DefaultLayoutComponent = ({ routes }) => (
  routes.map((route, i) => (
    <RouteWithSubRoutes key={i} {...route}/>
  ))
);

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => {
  if (route.redirect) {
    return (
      <Redirect to={route.redirect}/>
    );
  }
  return (
    <Route
      exact={route.exact}
      path={route.path}
      onEnter={route.onEnter}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}
    />
  );
};

const forceLogin = (routerProps, replace, callback) => {
  if (dva.app._store.getState().auth.isLogin) {
    callback();
    return;
  }
  const redirect = window.location.pathname;
  logger.log("forceLogin", redirect, dva.app, routerProps);
  dva.app._store.dispatch({
    type: "auth/redirectLogin",
    payload: redirect
  }).then((res) => {
    logger.log("forceLogin res", res);
    // callback();
  }).catch(err => {
    logger.log("forceLogin err", err);
    replace("/error");
    // callback();
  });
};

const RouterConfig = ({ history, app }) => {
  const Index = dynamic({
    app,
    component: () => import("./routes/Home/Index"),
  });
  const PCIndex = dynamic({
    app,
    component: () => import("./routes/PC/Index"),
  });
  // //////////////////////////////////////////////////////////
  // then our route config
  const routes = [
    {
      path: "/",
      exact: true,
      onEnter: forceLogin,
      redirect: "/home/index",
    },
    {
      path: "/bind",
      component: BindComponent,
    },
    {
      path: "/login",
      component: LoginComponent,
    },
    {
      path: "/proxy_login",
      component: ProxyLoginComponent,
    },
    {
      path: "/home",
      component: DefaultLayoutComponent,
      onEnter: forceLogin,
      routes: [
        {
          path: "/home/index",
          component: Index,
        },
      ],
    },
    {
      path: "/pc",
      component: DefaultLayoutComponent,
      routes: [
        {
          path: "/pc/index",
          component: PCIndex,
        },
      ],
    },
    {
      component: Error,
    },
  ];

  return (
    <Router history={history}>
      <Switch>
        {
          routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
          ))
        }
      </Switch>
    </Router>
  );
};


RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};
export default RouterConfig;
