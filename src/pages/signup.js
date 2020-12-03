import React from 'react';

//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/signup.css'

//Theme
import {ThemeProvider} from '@material-ui/core/styles'
import theme from '../theme'

//Component Imports
import Navbar from '../components/navbar'

//MaterialUI Imports 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//API
import axios from 'axios'

class SignUp extends React.Component
{
    constructor()
    {   
        super()
        this.state = {
            userHandle: '',
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            type: 'client',
            zipcode: '',
            isLoading: false,
            errors: {}
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
        this.setState({
            isLoading: true
        })

        let data = {
            userHandle: this.state.userHandle,
            fullName: this.state.fullName,
            email: this.state.email, 
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            type: this.state.type,
            zipcode: this.state.zipcode,
        }

        axios.post('/signup', JSON.stringify(data), 
        {            
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => 
        {
            console.log(res)
            this.setState({
                isLoading: false
            })
        })
        .catch(err => 
        {
            console.log(err.response.data)
            this.setState({
                errors: err.response.data,
                isLoading: false
            })
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
            Join the Parti
        </Button>

        return(
            <div>
                <Navbar />
                <Grid align="center">
                <ThemeProvider theme={theme}>
                    <div className="page-content">
                        <div className="sign-up-form">
                        <p className="title">Sign Up</p>
                        <p className="lightText">One step closer to joining the Parti</p>
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
                                <p>Part of the Parti? <a href="/login">Sign in</a></p>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
                </Grid>
            </div>
        )
    }
}

export default SignUp