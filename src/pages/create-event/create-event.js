import React from 'react';
import '../../stylesheets/create-event.css'
import '../../stylesheets/common.css'
import theme from '../../theme'
import StaticData from '../../static/static-data'

//SubComponents 
import Navbar from '../../components/navbar'
import ServiceForm from '../../components//create-event-components/service-form'

//Material UI components 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import {ThemeProvider} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'

//API 
import axios from 'axios'


class CreateEvent extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            title: '',
            zipcode: '',
            eventdate: new Date(), 
            description: '',
            serviceComponents: [], 
            services_count: 0,
            services: {}
        }
        //Method bindings 
        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.eventChange = this.eventChange.bind(this)
        this.calendarChange = this.calendarChange.bind(this)
        this.addService = this.addService.bind(this)
        this.deleteService = this.deleteService.bind(this)
        this.getChildrenData = this.getChildrenData.bind(this)
    }

    onSubmitForm()
    {

        let services = []

        for(var key of Object.keys(this.state.services))
        {
            let service = this.state.services[key]
            services.push
            (
                {
                    serviceType: service.service.value, 
                    description: service.description, 
                    vendorFound: false, 
                    service: {}
                }
            )
        }

        let data = {
            title: this.state.title, 
            zipcode: this.state.zipcode, 
            eventDate: this.state.eventdate.toISOString(), 
            description: this.state.description, 
            services 
        }

        axios.post('/events', JSON.stringify(data), 
        {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGV0cy1wYXJ0aSIsImF1ZCI6ImxldHMtcGFydGkiLCJhdXRoX3RpbWUiOjE2MDY5NDUzNDYsInVzZXJfaWQiOiJlVEQ5YmFTeDlDTWVoU2FwQ1RqYWF3NURKREkzIiwic3ViIjoiZVREOWJhU3g5Q01laFNhcENUamFhdzVESkRJMyIsImlhdCI6MTYwNjk0NTM0NiwiZXhwIjoxNjA2OTQ4OTQ2LCJlbWFpbCI6Im1hdHQ4cEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWF0dDhwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.SmZjPvcZq8Fl1eP8GhMIMWS38xw6nEy5pE5i8HUJlb1U2BsszmtDbQ0SfoxfjLZSnMlXrCmvZqQmrFiBnpamHPUmVsoaN9bwOhxPnwV0VKW_BeQ0fcaMI_2hW_B5hZZJjd1Yjme4r-QUTAveQwJSXFKNroNB9pKYAn1HPS12wf79CQFwWYRglrWB0H1GN-9zE8efh0f4gFRwPotLfHsH3ELZtpubr-mJkhPXxt6wcn7psMjQcfaLmqSjVNbEOjqu1bsmLL2BEG1zjdv8wBhvJtcx5nD57TzIP1gp1A7m02R23_1gI3org1BmaNmxOCG7YD0xinKV_R2qujY8txH14Q',
                'Content-Type': 'application/json'
            }
        })
        .then(res =>
        {
            console.log(res); 
            if(res.status === 201)
            {
                this.props.history.push('/events')
            }
        })
        .catch(err =>
        {
            console.log(err.response.data)
            this.setState({
                error: err.response.data
            })
        })
    }

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    calendarChange(date)
    {
        this.setState({
            eventdate: date
        })
    }

    addService()
    {
        let max = StaticData.MAX_NUM_SERVICES;
        if(this.state.services_count < max)
        {
            let newIndex = this.state.serviceComponents.length; 

            let newServicesArray = this.state.serviceComponents.concat(
                <ServiceForm 
                    key={newIndex} 
                    index={newIndex} 
                    deleteMethod={this.deleteService}
                    getChildrenData={this.getChildrenData}
                />
            )
    
            this.setState({
                serviceComponents: newServicesArray,
                services_count: this.state.services_count + 1
            })
        }
    }

    deleteService(deleteTargetIndex)                    
    {
        var newServices = this.state.serviceComponents.slice()
        var newServicesData = this.state.services

        newServices[deleteTargetIndex] = null
        delete newServicesData[deleteTargetIndex]

        this.setState({
            serviceComponents: newServices,
            services: newServicesData, 
            services_count: this.state.services_count - 1
        })
    }

    getChildrenData(key, data)                      //Called by the <ServiceForm> object to send info to THIS object
    {
        let newData = this.state.services
        newData[key] = data
        this.setState({
            services: newData
        })
    }

    render()
    {
        let AddServiceButton
        let SubmitButton
        let servicesCounter = this.state.services_count > 0 ? `(${this.state.services_count})` : null

        if(this.state.services_count === 0)
        {
            AddServiceButton =                         
            <div className="addService">
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={this.addService}
                    color="primary"
                >
                    Add Service
                </Button>
            </div>
        }else
        {
            SubmitButton =
            <div className="submit">
                <Button
                    variant="contained"
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={this.onSubmitForm}
                    color="primary"
                >
                    Submit
                </Button>
            </div>

            AddServiceButton = 
            <IconButton 
                color="primary" 
                onClick={this.addService}
                >
                <AddCircleOutlineIcon />
            </IconButton>

        }

        return(
            <div>
                <Navbar />

                <Grid align="center">
                    <ThemeProvider theme={theme}>
                    <div className="page-content">
                        <p className="title">Create Event</p>

                        <div className='general-info-form'>
                            <p className="question">Event Information</p>
                            <Grid container>
                                <Grid item sm="6" xs="12" align="left" >
                                    <TextField
                                    label="Event Name" 
                                    variant="outlined" 
                                    size="small" 
                                    fullWidth='true'
                                    name='title'
                                    value={this.state.title}
                                    onChange={this.eventChange}
                                    />
                                </Grid>

                                <Grid item sm="6" xs="12" align="right">
                                    <TextField
                                        label="Zipcode" 
                                        variant="outlined" 
                                        size="small" 
                                        name='zipcode'
                                        value={this.state.zipcode}
                                        onChange={this.eventChange}
                                        />
                                </Grid>

                                <Grid item sm="12" xs="12" align="left">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        name="date"
                                        label="Event Date"
                                        value={this.state.eventdate}
                                        onChange={this.calendarChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        style={{marginTop: 25}}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item sm="12" xs="12" className="seperator"></Grid>

                                <Grid item sm="12" xs="12" align="left">
                                    <TextField
                                        id="standard-multiline-static"
                                        placeholder="Describe your event"
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                        name="description"
                                        onChange={this.eventChange}
                                        value={this.state.description}
                                    />
                                </Grid>
                            </Grid>
                        </div>

                        
                        <div className="services-form">
                            <p className="question">Services {servicesCounter}</p>
                            {this.state.serviceComponents}
                        </div>
                        
                        {AddServiceButton}
                        {SubmitButton}


                    </div>
                    </ThemeProvider>
                </Grid>
            </div>
        )
    }
}

export default CreateEvent