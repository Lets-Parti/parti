import React, { Component } from 'react';
import StaticData from '../static/static-data'
import theme from '../theme'
import Navbar from '../components/navbar'
import EventCard from '../components/event-card'
import Grid from '@material-ui/core/Grid';
import {ThemeProvider} from '@material-ui/core/styles'

import '../stylesheets/common.css'

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
                'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhZDBjYjdjMGY1NTkwMmY5N2RjNTI0NWE4ZTc5NzFmMThkOWM3NjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGV0cy1wYXJ0aSIsImF1ZCI6ImxldHMtcGFydGkiLCJhdXRoX3RpbWUiOjE2MDY4NjI0MDIsInVzZXJfaWQiOiJlVEQ5YmFTeDlDTWVoU2FwQ1RqYWF3NURKREkzIiwic3ViIjoiZVREOWJhU3g5Q01laFNhcENUamFhdzVESkRJMyIsImlhdCI6MTYwNjg2MjQwMiwiZXhwIjoxNjA2ODY2MDAyLCJlbWFpbCI6Im1hdHQ4cEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWF0dDhwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.XLSD-6uvNsoAfMaWxl82K45pxfpzmy5fA5r8AFA0alxacDmL5Jq9UZptvv75-Om93mR8zwVXbIYm-QJw3ZQum-9yFJV2fWVnOg2zhT_mjRTFN66H6g5G3je5ZwYg3hvCyUKyvBgVsgaCd3VYT3jRKGKnbO68xhWpQ1viH1QArm5mo62af3G83rlpNMWp5w6zhseQssbftmKuV-c5_eHpvVtBxCM01HeJLdbx0FgRf59zYz9viodg1nw_fwywV5JQpDUkoupC_B8jK_m3YIo-_sVWfMqjbfau419Y3YYOWvV1oRtKvBIT_seP6Q4iKWgwojjf1giTADgROS2Iw96s8A'
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
            console.error(`Could not fetch event data. ${err}`);
        })
        // let sampleData = [{"createdAt":"2020-11-30T22:49:32.565Z","zipcode":"85286","eventDate":"2021-01-12T00:00:00","userHandle":"matt8p","services":[{"vendorFound":false,"service":{},"serviceType":"Photographer","description":"I need a cool photographer"}],"description":"Mom's 20th!","title":"Mom's Anniversary","eventID":"DCkKbWVxGDbO8sVCpfuZ"},{"services":[{"service":{},"description":"I need a DJ for my party","vendorFound":false,"serviceType":"DJ"}],"title":"Matt's Birthday","zipcode":"85286","description":"Matt's 20th Birthday","userHandle":"matt8p","eventDate":"2021-01-12T00:00:00","createdAt":"2020-11-30T22:46:59.721Z","eventID":"nIljOG40icYuGvq4ZSA5"}];
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