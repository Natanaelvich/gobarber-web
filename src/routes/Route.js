/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropsTypes from 'prop-types';

import AuthLayout from '~/pages/_Layouts/auth';
import Defaulayout from '~/pages/_Layouts/default';

import store from '~/store';

function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? Defaulayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropsTypes.bool.isRequired,
  component: PropsTypes.oneOfType([
    PropsTypes.element,
    PropsTypes.func,
  ]).isRequired,
};

RouteWrapper.defaulProps = {
  isPrivate: false,
};

export default RouteWrapper;
