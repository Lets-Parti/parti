import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedClientRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      (user.user.type === 'service' || user.authenticated === false) ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  user: state.user, 
});

ProtectedClientRoute.propTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(ProtectedClientRoute);