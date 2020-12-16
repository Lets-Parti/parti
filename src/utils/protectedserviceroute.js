import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedServiceRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      (user.authenticated === false || user.user.type === 'client') ? <Redirect to="/404" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  user: state.user
});

ProtectedServiceRoute.propTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(ProtectedServiceRoute);