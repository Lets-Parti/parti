import React from 'react';

//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/loginsignup.css'

//MaterialUI Imports 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'
import PropTypes from 'prop-types'

import {firebaseAnalytics} from '../utils/firebase'

class Login extends React.Component
{
    constructor()
    {   
        super()
        this.state = {
            emailOrHandle: '',
            password: '',
            errors: {}, 
            isLoading: false
        }
        this.eventChange = this.eventChange.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
    }   

    componentDidMount()
    {
        firebaseAnalytics.logEvent("login_visited")
    }

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm()
    {
        this.setState({                                                 //When submit, set isLoading to true and reset errors
            isLoading: true,
            errors: {}
        })
        let data = {
            emailOrHandle: this.state.emailOrHandle, 
            password: this.state.password
        }
        firebaseAnalytics.logEvent(`login_attempt_${data.emailOrHandle}`);
        this.props.loginUser(data, this.props.history);
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.UI.errors)
        {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        this.setState({
            isLoading: nextProps.UI.isLoading
        })
    }

    render()
    {
        let ButtonDisplay = this.state.isLoading ? 
        <CircularProgress color="primary" /> 
        :                   
        <Button
            variant="contained"
            color="primary"
            onClick={this.onSubmitForm}
            type="submit"
            >
            Log In
        </Button>

        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <div className="sign-up-form">
                        <form onSubmit={this.onSubmitForm}>
                        <p className="title">Log In</p>
                        <p className="lightText">Log in to your Parti profile</p>
                            <div className="sign-up-form-container">
                                <TextField
                                    label="Username or Email" 
                                    variant="outlined" 
                                    size="small" 
                                    fullWidth='true'
                                    name='emailOrHandle'
                                    onChange={this.eventChange}
                                    value={this.state.emailOrHandle}
                                    helperText={this.state.errors.emailOrHandle}
                                    error={this.state.errors.emailOrHandle ? true : false}
                                    />
                                <div className="form-seperator" />                             
                                <TextField
                                    label="Password" 
                                    variant="outlined" 
                                    type="password"
                                    size="small" 
                                    fullWidth='true'
                                    name='password'
                                    onChange={this.eventChange}
                                    value={this.state.password}
                                    helperText={this.state.errors.password}
                                    error={this.state.errors.password ? true : false}
                                    />
                                <div className="form-seperator" />
                                <div className="form-seperator" />
                                <p className="errorStatement">{this.state.errors.auth}</p>

                                {ButtonDisplay}

                                <div className="form-seperator" />
                                <p>Don't have an account? <a href="/signup">Sign up</a></p>
                            </div>
                            </form>
                        </div>
                    </div>
                </Grid>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired, 
    user: PropTypes.object.isRequired, 
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user, 
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login)