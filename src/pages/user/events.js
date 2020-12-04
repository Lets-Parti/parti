import React, { Component } from 'react';
import '../../stylesheets/common.css'
import theme from '../../theme'
import Navbar from '../../components/navbar'
import EventCard from '../../components/event-card'
import Grid from '@material-ui/core/Grid';
import {ThemeProvider} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import axios from 'axios'

class Events extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            events: null,
            isLoading: false
        }
    }

    componentDidMount()
    {
        let auth = {
            headers: {
                'Authorization': localStorage.FBIdToken
            }
        }   

        axios.get('/events/user', auth)
        .then(res =>
        {
            this.setState({
                events: JSON.stringify(res.data)
            })
        })
        .catch(err =>
        {
            console.log(err)
            console.error(`Could not fetch event data. ${err.code}`);
        })
        // let sampleData = [{"createdAt":"2020-11-30T22:49:32.565Z","zipcode":"85286","eventDate":"2021-01-12T00:00:00","userHandle":"matt8p","services":[{"vendorFound":false,"service":{},"serviceType":"Photographer","description":"I need a cool photographer"},{"vendorFound":false,"service":{},"serviceType":"Photographer","description":"I need a cool photographer"},{"vendorFound":false,"service":{},"serviceType":"Photographer","description":"I need a cool photographer"}],"description":"Mom's 20th!","title":"Mom's Anniversary","eventID":"DCkKbWVxGDbO8sVCpfuZ"},{"services":[{"service":{},"description":"I need a DJ for my party","vendorFound":false,"serviceType":"DJ"}],"title":"Matt's Birthday","zipcode":"85286","description":"Matt's 20th Birthday","userHandle":"matt8p","eventDate":"2021-01-12T00:00:00","createdAt":"2020-11-30T22:46:59.721Z","eventID":"nIljOG40icYuGvq4ZSA5"}];
        // this.setState({
        //     events: JSON.stringify(sampleData)
        // })
    }

    render()
    {
        let arrayOfEvents = [] 

        if(this.state.events !== null)
        {
            JSON.parse(this.state.events).map(event=>
            {
                arrayOfEvents.push(<EventCard key={event.eventID} data={event}/>)
            })
        }
        
        return(
            <div>
                <Navbar />
                <Grid align="center">
                    <ThemeProvider theme={theme}>
                    <div className="page-content">
                        <p className="title">My Events</p>
                        {arrayOfEvents}
                    </div>
                    </ThemeProvider>
                </Grid>
            </div>
        )
    }
}

export default Events;