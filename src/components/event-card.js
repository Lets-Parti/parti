import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import ServiceCard from '../components/service-card'
import '../stylesheets/event.css'

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

        let serviceComponents = []
        services.forEach(service =>
        {
            serviceComponents.push(<ServiceCard data={service} />)
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
 

                        <p className="eventCardSubtitle">Description</p>
                        <hr></hr>
                        <p>{this.state.description}</p>

                        <p className="eventCardSubtitle">Services ({services.length})</p>
                        <hr></hr>
                        {serviceComponents}

                    </Grid>
                </div>
            </div>
        )
    }
}

export default EventCard