import React from 'react';
import '../../stylesheets/create-event.css'
import '../../stylesheets/common.css'
import StaticData from '../../static/static-data'

//SubComponents 
import ServiceForm from '../../components/create-event-components/service-form'

//Material UI components 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux'
import { createEvent } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

class NewEvent extends React.Component
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
            services: {}, 
            errors: {}, 
            isLoading: false
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
                    service: null
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

        this.props.createEvent(data, this.props.history);
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
        console.log(this.state); 
        let AddServiceButton
        let SubmitButton
        let servicesCounter = this.state.services_count > 0 ? `(${this.state.services_count})` : null
        let missingService = this.state.errors.serviceType ? <p className="errorMessage">{this.state.errors.serviceType}</p> : null

        if(this.state.isLoading)                                    
        {
            SubmitButton = <CircularProgress color="primary" />
            AddServiceButton = null
        }else if(this.state.services_count === 0)
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
                <Grid align="center">
                    <div className="page-content">
                        <p className="title">Create Event</p>

                        <div className='general-info-form'>
                            <p className="question">Event Information</p>
                            <Grid container justify="space-around">
                                <Grid item sm="7" xs="7" align="left" >
                                    <TextField
                                    label="Event Name" 
                                    variant="outlined" 
                                    size="small" 
                                    fullWidth='true'
                                    name='title'
                                    value={this.state.title}
                                    onChange={this.eventChange}
                                    helperText={this.state.errors.title}
                                    error={this.state.errors.title ? true : false}
                                    />
                                </Grid>

                                <Grid item sm="5" xs="5" align="right">
                                    <TextField
                                        label="Zipcode" 
                                        variant="outlined" 
                                        size="small" 
                                        name='zipcode'
                                        value={this.state.zipcode}
                                        onChange={this.eventChange}
                                        helperText={this.state.errors.zipcode}
                                        error={this.state.errors.zipcode ? true : false}
                                        />
                                </Grid>

                                <Grid item sm="7" xs="7" align="left">
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
                                        helperText={this.state.errors.eventDate}
                                        error={this.state.errors.eventDate ? true : false}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item sm="5" xs="5" align="right">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            value={this.state.eventdate}
                                            onChange={this.calendarChange}
                                            variant="inline"
                                            name="date"
                                            margin="normal"
                                            id="time-picker"
                                            label="Event Time"
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                            style={{marginTop: 25}}
                                            helperText={this.state.errors.eventDate}
                                            error={this.state.errors.eventDate ? true : false}
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
                                        helperText={this.state.errors.description}
                                        error={this.state.errors.description ? true : false}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        
                        
                        <div className="services-form">
                            <p className="question">Services {servicesCounter} {missingService}</p>
                            {this.state.serviceComponents}
                        </div>
                        {AddServiceButton}
                        {SubmitButton}
                    </div>
                </Grid>
            </div>
        )
    }
}
NewEvent.propTypes = {
    createEvent: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

const mapActionsToProps = {
    createEvent
}

export default connect(mapStateToProps, mapActionsToProps)(NewEvent)