import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Navigation from "../components/Navigation";


const DefaultLayout = ({ children }) => (
  <>
    <Navigation />
    {children}
  </>
);
// const AuthLayout = ({ children }) => <>{children}</>;

export default function RouteWrapper ({
  component: Component,
  isPrivate = false,
  ...rest
}) {



  return (
    <Route
      {...rest}
      component={(props) => (
        <>

          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        </>
      )}
    />
  );
}
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
