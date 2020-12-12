import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedClientRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      (user.authenticated === false || (user.authenticated === true && user.user.type === 'service')) ? <Redirect to="/404" /> : <Component {...props} />
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