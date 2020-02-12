/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropsTypes from 'prop-types';

function RouteWrapper({ component: Component, isPrivate = false, ...rest }) {
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropsTypes.bool.isRequired,
  component: PropsTypes.oneOfType([PropsTypes.element, PropsTypes.func]).isRequired,
};

RouteWrapper.defaulProps = {
  isPrivate: false,
};

export default RouteWrapper;
