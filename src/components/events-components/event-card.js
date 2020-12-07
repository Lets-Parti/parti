import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import ServiceCard from './service-card'
import '../../stylesheets/event.css'
import '../../stylesheets/common.css'

class EventCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            title: this.props.data.title, 
            description: this.props.data.description, 
            createdAt: this.props.data.createdAt,
            eventDate: this.props.data.eventDate, 
            services: JSON.stringify(this.props.data.services), 
            userHandle: this.props.data.userHandle, 
            zipcode: this.props.data.zipcode, 
        }
    }

    render(props)
    {
        let date = new Date(this.state.eventDate)
        let services = JSON.parse(this.state.services)

        let serviceCards = []
        services.forEach(service =>
        {
            serviceCards.push(
            <Grid sm="6" xs="12">     
                <ServiceCard data={service} />
            </Grid>
            )
        })

        return(
            <div className="eventCard">
                <div className="eventWrapper">
                    <Grid align="left">
                        <p className="eventCardTitle">{this.state.title}</p>

                        <div class="eventInfo"> 
                            <p class="subInfo"> <EventIcon fontSize="small"/>{date.toString()}</p>
                            <p class="subInfo"> <LocationOnIcon fontSize="small"/>{this.state.zipcode}</p>
                        </div>
                        <div className="seperator" />
                        
                        <hr></hr>
                        <p>{this.state.description}</p>

                        <p className="eventCardSubtitle">Services ({services.length})</p>
                        <hr></hr>

                        <Grid container>
                            {serviceCards}
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default EventCard