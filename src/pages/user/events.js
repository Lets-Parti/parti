import React, { Component } from 'react';
import '../../stylesheets/common.css'
import theme from '../../theme'
import Navbar from '../../components/navbar'
import EventCard from '../../components/event-card'
import Grid from '@material-ui/core/Grid';
import {ThemeProvider} from '@material-ui/core/styles'

import axios from 'axios'

class Events extends Component
{
    constructor()
    {
        super()
        this.state = {
            events: null
        }
    }

    componentDidMount()
    {
        let auth = {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGV0cy1wYXJ0aSIsImF1ZCI6ImxldHMtcGFydGkiLCJhdXRoX3RpbWUiOjE2MDY5NDUzNDYsInVzZXJfaWQiOiJlVEQ5YmFTeDlDTWVoU2FwQ1RqYWF3NURKREkzIiwic3ViIjoiZVREOWJhU3g5Q01laFNhcENUamFhdzVESkRJMyIsImlhdCI6MTYwNjk0NTM0NiwiZXhwIjoxNjA2OTQ4OTQ2LCJlbWFpbCI6Im1hdHQ4cEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWF0dDhwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.SmZjPvcZq8Fl1eP8GhMIMWS38xw6nEy5pE5i8HUJlb1U2BsszmtDbQ0SfoxfjLZSnMlXrCmvZqQmrFiBnpamHPUmVsoaN9bwOhxPnwV0VKW_BeQ0fcaMI_2hW_B5hZZJjd1Yjme4r-QUTAveQwJSXFKNroNB9pKYAn1HPS12wf79CQFwWYRglrWB0H1GN-9zE8efh0f4gFRwPotLfHsH3ELZtpubr-mJkhPXxt6wcn7psMjQcfaLmqSjVNbEOjqu1bsmLL2BEG1zjdv8wBhvJtcx5nD57TzIP1gp1A7m02R23_1gI3org1BmaNmxOCG7YD0xinKV_R2qujY8txH14Q'
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