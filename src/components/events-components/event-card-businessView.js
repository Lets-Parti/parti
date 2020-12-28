import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import MessageIcon from '@material-ui/icons/Message';

import ServiceCardBView from './service-card-businessView'
import ConnectModal from '../modal-component/connectmodal'
import '../../stylesheets/event.css'
import '../../stylesheets/common.css'

//redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
            modalOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    offer()
    {

    }

    openModal() {
        this.setState({
            modalOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalOpen: false
        })
    }

    redirect() {
        window.location.href = '/login'
    }

    render(props)
    {
        const { authenticated } = this.props.user; 
        
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

        let connectModal = authenticated ? 
        <ConnectModal open={this.state.modalOpen} handleClose={this.closeModal} userHandle={this.state.userHandle}/> 
        : 
        null

        let chatButton = authenticated ? 
        <Button aria-label="message" color="primary" variant="contained" onClick={this.openModal}
            startIcon={<MessageIcon />}
            display='none'>
            Message
        </Button>
        :
        <Button aria-label="message" color="primary" variant="contained" onClick={this.redirect}
            startIcon={<MessageIcon />}
            display='none'>
            Message
        </Button>

        let smallChatButton = authenticated ?
        <IconButton aria-label="message" color="primary" onClick={this.modalOpen}>
            <MessageIcon />
        </IconButton>
        :
        <IconButton aria-label="message" color="primary" onClick={this.redirect}>
            <MessageIcon />
        </IconButton>

        return(
            <div className="eventCard">
                {connectModal}
                <div className="eventWrapper">
                    <Grid container align="left">
                        <Grid item sm={9} xs={9}>
                            <p className="eventCardTitle">{this.state.title}</p>
                            <div class="eventInfo"> 
                                <p class="subInfo"> Hosted by <b>@{this.state.userHandle}</b></p>
                                <div className="seperator" />
                                <p class="subInfo"> <EventIcon fontSize="small"/>{date.toString()}</p>
                                <p class="subInfo"> <LocationOnIcon fontSize="small"/>{this.state.zipcode}</p>
                            </div>
                        </Grid>
                        <Grid item sm={3} xs={3} align="right">
                            <div className="message-button-large">
                                <Tooltip title="Reach out to client">
                                    {chatButton}
                                </Tooltip>
                            </div>
                            <div className="message-button-small">
                                <Tooltip title="Reach out to client">
                                    {smallChatButton}
                                </Tooltip>
                            </div>
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

EventCardBView.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {

}


export default connect(mapStateToProps, mapActionsToProps)(EventCardBView)