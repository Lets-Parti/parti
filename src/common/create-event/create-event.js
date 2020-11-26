import React from 'react';
import '../create-event/create-event.css'
import StaticData from '../../static/static-data'
import theme from '../../theme'

import Navbar from '../../components/navbar'
import ServiceForm from '../../components/create-event-components/service-form'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {ThemeProvider} from '@material-ui/core/styles'

import DateFnsUtils from '@date-io/date-fns'

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

class SelectServices extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            index: 0,
            services_count: 0,
            services: [],
            childrenData: {}
        }
        this.newService = this.newService.bind(this)
        this.deleteService = this.deleteService.bind(this)
        this.getChildrenData = this.getChildrenData.bind(this)
    }

    getChildrenData(key, data)
    {
        let newData = this.state.childrenData
        newData[key] = data
        this.setState({
            childrenData: newData
        }, () =>
        {
            this.updateParentState()
        })
    }

    updateParentState()
    {
        this.props.updateServices(this.state.childrenData) 
    }

    newService()
    {
        let max = StaticData.MAX_NUM_SERVICES
        if(this.state.services_count < max)
        {
            let newState = this.state.services.concat(
                <ServiceForm 
                    key={this.state.index} 
                    index={this.state.index} 
                    deleteMethod={this.deleteService}
                    getChildrenData={this.getChildrenData}
                />
            )
    
            this.setState({
                index: this.state.index + 1, 
                services_count: this.state.services_count + 1,
                services: newState
            }, ()=>
            {
                this.updateParentState()
            })
        }
    }

    deleteService(deleteTargetIndex)
    {
        var newServices = this.state.services.slice()
        var newChildrenData = this.state.childrenData
        newServices[deleteTargetIndex] = null
        newChildrenData[deleteTargetIndex] = null

        this.setState({
            services: newServices,
            services_count: this.state.services_count - 1,
            childrenData: newChildrenData
        }, () =>
        {
            this.updateParentState()
        })
    }

    render()
    {
        return(
            <div>
                <p className="question2">What services are you looking for?</p>

                {this.state.services}

                <IconButton aria-label="add-service" 
                            color="primary"
                            onClick={this.newService}
                >
                    <AddCircleOutlineIcon fontSize="inherit" />
                </IconButton>
            </div>
        )
    }
}

class EventGeneralInformation extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            title: '',
            zipcode: '',
            eventdate: new Date('2020-11-25T00:00:00'),
            description: '',
        }
        this.eventChange = this.eventChange.bind(this)
        this.calendarChange = this.calendarChange.bind(this)
    }

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        }, () =>
        {
            this.updateParentState()
        })
    }

    calendarChange(date)
    {
        this.setState({
            eventdate: date
        }, () =>
        {
            this.updateParentState()
        })
    }

    updateParentState()
    {
        this.props.updateGeneralInformation(this.state)
    }

    render()
    {
        return(
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
        )
    }
}


class CreateEvent extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            general_info: {},
            services: {},
        }
        this.updateServices = this.updateServices.bind(this)
        this.updateGeneralInformation = this.updateGeneralInformation.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
    }

    onSubmitForm()
    {
        let dataSentToDB = {
            title: this.state.general_info.title, 
            zipcode: this.state.general_info.zipcode, 
            date: this.state.general_info.eventdate, 
            description: this.state.general_info.description,
            services: this.state.services
        }
        console.log(dataSentToDB)
    }

    updateServices(data)
    {
        this.setState({
            services: data
        })
    }

    updateGeneralInformation(data)
    {
        this.setState({
            general_info: data
        })
    }

    render()
    {
        return(
            <div>
                <Navbar />
                
                <Grid align="center">
                    <ThemeProvider theme={theme}>
                    <div className="page-content">
                        <p className="title">Create Event</p>

                        <EventGeneralInformation updateGeneralInformation={this.updateGeneralInformation}/>
                        <SelectServices updateServices={this.updateServices}/>

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

                    </div>
                    </ThemeProvider>
                </Grid>
            </div>
        )
    }
}

export default CreateEvent