import React from 'react';

//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/loginsignup.css'
import '../stylesheets/feedback.css'

//MaterialUI Imports 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux'
import { createFeedback } from '../redux/actions/dataActions'
import PropTypes from 'prop-types'

import {firebaseAnalytics} from '../utils/firebase'

class Feedback extends React.Component
{
    constructor()
    {   
        super()
        this.state = {
            emailOrHandle: '',
            info: '',
            phone: '',
            errors: {}, 
            isLoading: false
        }
        this.eventChange = this.eventChange.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
    }   

    componentDidMount()
    {
        firebaseAnalytics.logEvent("feedback_visited"); 
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
            info: this.state.info,
            phone: this.state.phone
        }
        this.props.createFeedback(data, this.props.history)
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
            >
            Submit Form
        </Button>

        console.log(this.state);

        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <div className="sign-up-form">
                        <p className="title">Feedback</p>
                        <p className="lightText">Thanks for using Parti! Let us know about your experience.</p>
                            <div className="feedback-form-container">
                                <TextField
                                    label="Please talk about your experience" 
                                    variant="outlined" 
                                    size="large" 
                                    fullWidth='true'
                                    name='info'
                                    onChange={this.eventChange}
                                    value={this.state.info}
                                    multiline
                                    rows={15}
                                    
                                    helperText={this.state.errors.info}
                                    error={this.state.errors.info ? true : false}
                                    />
                                <div className="form-seperator"  />  
                                <div className="form-seperator" />

                                <TextField
                                    label="Email (Optional)" 
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
                                    label="Phone Number (Optional)" 
                                    variant="outlined" 
                                    size="small" 
                                    fullWidth='true'
                                    name='phone'
                                    onChange={this.eventChange}
                                    value={this.state.phone}
                                    helperText={this.state.errors.phone}
                                    error={this.state.errors.phone ? true : false}
                                    />
                                <div className="form-seperator" />
                                <div className="form-seperator" />
                                {ButtonDisplay}
                                <div className="form-seperator" />
                            </div>
                        </div>
                    </div>
                </Grid>
            </div>
        )
    }
}

Feedback.propTypes = {
    createFeedback: PropTypes.func.isRequired, 
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

const mapActionsToProps = {
    createFeedback
}

export default connect(mapStateToProps, mapActionsToProps)(Feedback)
