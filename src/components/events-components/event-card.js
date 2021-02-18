import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import { Button } from '@material-ui/core';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ShareIcon from '@material-ui/icons/Share';

import ServiceCard from './service-card'
import '../../stylesheets/event.css'
import '../../stylesheets/common.css'

import {cleanDate} from '../../utils/validators';

import ConnectModal from '../modal-component/connectmodal'

//redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class EventCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            title: this.props.data.title, 
            description: this.props.data.description, 
            createdAt: this.props.data.createdAt,
            fullName: this.props.data.fullName, 
            userImageUrl: this.props.data.userImageUrl, 
            eventDate: this.props.data.eventDate, 
            services: JSON.stringify(this.props.data.services), 
            userHandle: this.props.data.userHandle, 
            zipcode: this.props.data.zipcode, 
            eventID: this.props.data.eventID,
            modalOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
        window.location.href = '/login';
    }

    copyClipboardAlert() {
        alert('Event link copied to clipboard');
    }

    render(props)
    {
        const { authenticated, user } = this.props.user; 

        let date = new Date(this.state.eventDate).toString(); 
        let createdAtDate = new Date(this.state.createdAt).toString(); 
        date = cleanDate(date);                                     //Clean up what is displayed as the event date & time
        createdAtDate = cleanDate(createdAtDate); 

        let services = JSON.parse(this.state.services)

        let serviceCards = []
        services.forEach(service =>
        {
            serviceCards.push(
            <Grid sm="12" xs="12">     
                <ServiceCard data={service} eventID={this.state.eventID} userHandle={this.state.userHandle}/>
            </Grid>
            )
        })
        
        let chips = [];
        services.forEach(service =>
        {
          chips.push
            (
              <Chip
                className="chip-padding"
                color="primary"
                label={service.serviceType}
                style={{ fontSize: '1rem', marginBottom: '0.5rem', marginTop: '0.5rem' }} />
            )
        })

        let connectModal = authenticated ? 
        <ConnectModal open={this.state.modalOpen} handleClose={this.closeModal} userHandle={this.state.userHandle}/> 
        : 
        null

        let chatButton = authenticated ? 
        <Button aria-label="message" color="primary" variant="outlined" onClick={this.openModal}
            startIcon={<MessageIcon />}
            display='none'>
            Message Host
        </Button>
        :
        <Button aria-label="message" color="primary" variant="outlined" onClick={this.redirect}
            startIcon={<MessageIcon />}
            display='none'>
            Message Host
        </Button>

        let profileUrl = `/user/${this.state.userHandle}`;
        if(authenticated && user.userHandle === this.state.userHandle)
        {
            chatButton = null; 
            profileUrl = '/account/edit';
        }

        return(
            <div className="eventCard">
                {connectModal}
                {/* <div className="eventWrapper">
                    <Grid align="left">
                        <p className="eventCardTitle">{this.state.title}</p>
                        <p class="subInfo"> Event ID: <span className="code">{this.props.data.eventID}</span></p>
                        <div className="seperator" />
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
                </div> */}

                
                <Accordion>
                    <Tooltip title="Expand for Details">
                        <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Grid container align="left" className="accordionTitle">
                            <Grid item sm={7} xs={12}>
                                <p className="eventCardTitle">{this.state.title}</p>
                                <p className="eventHostName">hosted by {this.state.fullName}</p> 
                            </Grid>
                            <Grid item sm={5} xs={12} align="left">
                                <div className="event-date-location">
                                    <p class="subInfo">{date.toString()}</p>
                                    <p class="subInfo">Arizona, {this.state.zipcode} </p>
                                </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                            <div class="eventInfo"> 
                                <hr />
                                <p class="subInfo">Looking for {services.length} service(s)</p>
                                {chips}
                            </div>
                            </Grid>
                        </Grid>
                        </AccordionSummary>
                    </Tooltip>
                    
                    <AccordionDetails>
                        <Grid container align="left">
                            <Grid item sm={12} xs={12} className="event-card-subsection">
                                <p className="eventCardSubtitle">Host</p>
                                <Grid container spacing={2}>
                                    <Grid item md={1} sm={2} xs={2}>
                                        <Tooltip title="Visit Profile">
                                            <Link href={`/user/${this.state.userHandle}`}>
                                                <img className="user-profile-image-event-card" src={this.state.userImageUrl} alt="User Profile"/>
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item md={7} sm={5} xs={10}>
                                        <Link href={profileUrl}>
                                            <p className="host-name">{this.state.fullName}</p>
                                        </Link>
                                    </Grid>
                                    <Grid item md={4} sm={5} xs={12}>
                                        {chatButton}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item sm={12} xs={12} className="event-card-subsection">
                                <p className="eventCardSubtitle">Event Details</p>

                                <div className="event-date-location">
                                    <p class="subInfo"> <EventIcon fontSize="small"/>{date.toString()}</p>
                                    <p class="subInfo"> <LocationOnIcon fontSize="small"/>Arizona, {this.state.zipcode} (message host for exact location)</p>
                                </div>

                                <p className="event-description">{this.state.description}</p>
                            </Grid>

                            <Grid item sm={12} xs={12} className="event-card-subsection">
                                <p className="eventCardSubtitle">Services {this.state.fullName} is looking for ({services.length})</p>
                                <p className="eventHostName">Interested in being a vendor for this event? Reach out to the host {this.state.fullName}</p>
                                <Grid container>
                                    {serviceCards}
                                </Grid>
                            </Grid>
                            <CopyToClipboard
                                text={`https://parti.app/events/${this.state.eventID}`}>      
                                <Button aria-label="message" color="primary" variant="outlined" onClick={this.copyClipboardAlert}
                                startIcon={<ShareIcon />}
                                display='none'
                                size='small'
                                >
                                Share Event
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }
}

EventCard.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {

}


export default connect(mapStateToProps, mapActionsToProps)(EventCard)