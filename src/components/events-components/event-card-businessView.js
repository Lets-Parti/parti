import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import ServiceCard from './service-card'
import ServiceCardBView from './service-card-businessView'

import '../../stylesheets/event.css'
import '../../stylesheets/common.css'

class EventCardBView extends Component
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

    offer()
    {

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
                <ServiceCardBView data={service} />
            </Grid>
            )
        })

        return(
            <div className="eventCard">
                <div className="eventWrapper">
                    <Grid container align="left">
                        <Grid item sm={10} xs={10}>
                            <p className="eventCardTitle">{this.state.title}</p>
                            <div class="eventInfo"> 
                                <p class="subInfo"> Hosted by <b>@{this.state.userHandle}</b></p>
                                <div className="seperator" />
                                <p class="subInfo"> <EventIcon fontSize="small"/>{date.toString()}</p>
                                <p class="subInfo"> <LocationOnIcon fontSize="small"/>{this.state.zipcode}</p>
                            </div>
                        </Grid>
                        <Grid item sm={2} xs={2}>
                            <Tooltip title="Reach out to client">
                                <Button
                                    variant="contained"
                                    onClick={this.offer}
                                    color="primary"
                                >
                                    Poke   
                                </Button>
                            </Tooltip>
                        </Grid>

                        <Grid sm={12} xs={12}>
                            <div className="seperator" />
                        </Grid>

                        <Grid sm={12} xs={12}>
                            <hr />
                            <p>{this.state.description}</p>
                            <p className="eventCardSubtitle">Services ({services.length})</p>
                            <hr />
                        </Grid>

                        <Grid container>
                            {serviceCards}
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default EventCardBView