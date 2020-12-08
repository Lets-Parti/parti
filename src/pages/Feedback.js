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
import PropTypes from 'prop-types'

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

        const {classes, UI: {isLoading}} = this.props; 
        const {errors} = this.state
        console.log(this.state);
        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <div className="sign-up-form">
                        <p className="title">Feedback Form</p>
                        <p className="lightText">How was your experience using Parti? Please leave your thoughts on the form below, along with your information!</p>
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
                                <p className="errorStatement">{this.state.errors.auth}</p>

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
    loginUser: PropTypes.func.isRequired, 
    user: PropTypes.object.isRequired, 
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user, 
    UI: state.UI
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps)(Feedback)