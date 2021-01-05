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
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'
import PropTypes from 'prop-types'

//Select
import Select from 'react-select'
import StaticData from '../static/static-data'

import {firebaseAnalytics} from '../utils/firebase'

class SignUp extends React.Component
{
    constructor()
    {   
        super()
        this.state = {
            userHandle: '',
            fullName: '',
            email: '',
            phone: '', 
            password: '',
            confirmPassword: '',
            type: 'client',
            zipcode: '',
            bio: '',
            service: '',
            isLoading: false,
            errors: {}
        }
        this.eventChange = this.eventChange.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.switchToServiceSignUp = this.switchToServiceSignUp.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }   

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm()
    {
        this.setState({
            isLoading: true
        })

        let data = {
            userHandle: this.state.userHandle,
            fullName: this.state.fullName,
            email: this.state.email, 
            phone: this.state.phone, 
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            bio: this.state.bio, 
            type: this.state.type,
            zipcode: this.state.zipcode,
            service: this.state.service.value
        }
        firebaseAnalytics.logEvent(`signup_attempted_${data.userHandle}`);
        this.props.signupUser(data, this.props.history); 
    }

    switchToServiceSignUp()
    {
        this.setState({
            type: 'service'
        })
    }

    handleChangeSelect(name, value)
    {
        this.setState({
            [name]: value
        })
    }

    componentDidMount()
    {
        let type = this.props.match.params.userType;
        if(!type || type === '')
        {
            type = 'client'
        }else
        {
            type = 'service';
        }
        this.setState({
            type
        })
        firebaseAnalytics.logEvent("signup_visited")
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
            Join Parti
        </Button>

        let signUpForm = this.state.type === 'client' ? 
        <div className="sign-up-form-container">
        <TextField
            label="Email" 
            variant="outlined" 
            size="small" 
            fullWidth='true'
            name='email'
            onChange={this.eventChange}
            value={this.state.email}
            helperText={this.state.errors.email}
            error={this.state.errors.email ? true : false}
            />
        <div className="form-seperator" />
        <TextField
            label="Phone" 
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
        <TextField
            label="Full Name" 
            variant="outlined" 
            size="small" 
            fullWidth='true'
            name='fullName'
            onChange={this.eventChange}
            value={this.state.fullName}
            helperText={this.state.errors.fullName}
            error={this.state.errors.fullName ? true : false}
            />
        <div className="form-seperator" />    
        <TextField
            label="Username" 
            variant="outlined" 
            size="small" 
            fullWidth='true'
            name='userHandle'
            onChange={this.eventChange}
            value={this.state.userHandle}
            helperText={this.state.errors.userHandle}
            error={this.state.errors.userHandle ? true : false}
            />
        <div className="form-seperator" />                                   
        <TextField
            label="Zipcode" 
            variant="outlined" 
            size="small" 
            fullWidth='true'
            name='zipcode'
            onChange={this.eventChange}
            value={this.state.zipcode}
            helperText={this.state.errors.zipcode}
            error={this.state.errors.zipcode ? true : false}
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
        <TextField
            label="Confirm Password" 
            variant="outlined" 
            type="password"
            size="small" 
            fullWidth='true'
            name='confirmPassword'
            onChange={this.eventChange}
            value={this.state.confirmPassword}
            helperText={this.state.errors.confirmPassword}
            error={this.state.errors.confirmPassword ? true : false}
            />
        <div className="form-seperator" />
        <div className="form-seperator" />

        
        {ButtonDisplay}
        <div className="form-seperator" />
        <Button
            variant="outlined"
            color="primary"
            onClick={this.switchToServiceSignUp}
            >
            Join as a Vendor
        </Button>

        <div className="form-seperator" />
        <p>Part of the Parti? <a href="/login">Sign in</a></p>
    </div> 
    :   
    // Sign up for Services
    <div className="sign-up-form-container">                            
        <TextField
            label="Company Email" 
            variant="outlined" 
            size="small" 
            fullWidth='true'
            name='email'
            onChange={this.eventChange}
            value={this.state.email}
            helperText={this.state.errors.email}
            error={this.state.errors.email ? true : false}
            />
        <div className="form-seperator" />
        <TextField
            label="Phone" 
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
        <TextField
            label="Company Name" 
            variant="outlined" 
            size="small" 
            fullWidth='true'
            name='fullName'
            onChange={this.eventChange}
            value={this.state.fullName}
            helperText={this.state.errors.fullName}
            error={this.state.errors.fullName ? true : false}
            />
        <div className="form-seperator" />    
        <TextField
            label="Username" 
            variant="outlined" 
            size="small" 
            fullWidth='true'
            name='userHandle'
            onChange={this.eventChange}
            value={this.state.userHandle}
            helperText={this.state.errors.userHandle}
            error={this.state.errors.userHandle ? true : false}
            />
        <div className="form-seperator" />                                   
        <TextField
            label="Zipcode" 
            variant="outlined" 
            size="small" 
            fullWidth='true'
            name='zipcode'
            onChange={this.eventChange}
            value={this.state.zipcode}
            helperText={this.state.errors.zipcode}
            error={this.state.errors.zipcode ? true : false}
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
        <TextField
            label="Confirm Password" 
            variant="outlined" 
            type="password"
            size="small" 
            fullWidth='true'
            name='confirmPassword'
            onChange={this.eventChange}
            value={this.state.confirmPassword}
            helperText={this.state.errors.confirmPassword}
            error={this.state.errors.confirmPassword ? true : false}
            />
        <div className="form-seperator" />      
        <p className="lightText">What service do you provide?</p>
        <Select 
            options={StaticData.options} 
            styles="width:100px;" 
            id="select"
            value={this.state.service}
            onChange={this.handleChangeSelect.bind(this, "service")}
        />            
        <p className="errorStatement">{this.state.errors.service}</p>
        <div className="form-seperator" />                    
        <TextField
            placeholder="Bio. Tell clients about your company!"
            variant="outlined" 
            type="password"
            size="small" 
            multiline
            rows={5}
            fullWidth='true'
            name='bio'
            onChange={this.eventChange}
            value={this.state.bio}
            helperText={this.state.errors.bio}
            error={this.state.errors.bio ? true : false}
        />
        <div className="form-seperator" />
        <div className="form-seperator" />
        {ButtonDisplay}
        <div className="form-seperator" />
        <p>Have an account? <a href="/login">Sign in</a></p>
    </div>


        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <div className="sign-up-form">
                        <p className="title">Sign Up</p>
                        <p className="lightText">Join the Arizona Beta</p>
                        <form onSubmit={this.onSubmitForm}>
                            {signUpForm}   
                        </form>
                        </div>
                    </div>
                </Grid>
            </div>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired, 
    user: PropTypes.object.isRequired, 
    UI: PropTypes.object.isRequired, 
    signupUser: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(SignUp)