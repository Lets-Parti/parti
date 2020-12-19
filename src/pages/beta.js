import React from 'react';

//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/beta.css'

//MaterialUI Imports 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';


import axios from 'axios';

class Beta extends React.Component
{
    constructor()
    {   
        super()
        this.state = {
            fullName: '', 
            email: '', 
            phone: '', 
            company: '',
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
        let dataSentToDB = {
            fullName: this.state.fullName, 
            email: this.state.email, 
            phone: this.state.phone, 
            company: this.state.company
        }
        axios.post('/beta', JSON.stringify(dataSentToDB),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res =>
        {
            alert('Welcome to Parti!');
        })
        .catch(err =>
        {
            alert('Oops. Something went wrong ;(');
        })

    }

    render()
    {
        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <p className="beta-title">Effortless Event Planning</p>
                        <p className="lightText">Arizona Beta available <b>January 4th, 2021</b></p>
                    <div className="seperator" />
                    <div className="seperator" />
                    <div className="beta-form">
                        <TextField
                            label="Email" 
                            variant="outlined" 
                            size="small" 
                            name='email'
                            fullWidth
                            onChange={this.eventChange}
                            value={this.state.email}
                            />
                        <div className="seperator" />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onSubmitForm}
                            >
                            Join Beta
                        </Button>
                    </div>

                    </div>
                        
                </Grid>
            </div>
        )
    }
}

export default Beta