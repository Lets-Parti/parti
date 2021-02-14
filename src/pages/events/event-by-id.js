import React from 'react';
import '../../stylesheets/common.css'
import EventCard from '../../components/events-components/event-card'
import EventCardBView from '../../components/events-components/event-card-businessView'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import nothing_img from '../../resources/images/nothing_found.png';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';

//Redux
import { connect } from 'react-redux'
import { getEventByID } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

class EventByID extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            
        }
    }

    componentDidMount()
    {
        const eventID = this.props.match.params.eventID;
        this.props.getEventByID(eventID); 
    }

    render()
    {
        const {events, isLoading} = this.props.data; 
        const {authenticated, user} = this.props.user; 

        const nothingFound = 
        <div>
            <img src={nothing_img} className="nothingImg" alt="Not Found"/>
            <p>None found.</p>
        </div>

        let dataDisplay = []; 
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            if (!Array.isArray(events)){
                dataDisplay.push(<EventCard key={events.eventID} data={events}/>) 
            }
            else if(events.length === 0)
            {
                dataDisplay.push(nothingFound); 
            }else
            {
                events.forEach(event => 
                {
                    dataDisplay.push(<EventCard key={event.eventID} data={event}/>)    
                });
            }
        }
        
        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <Link href='/events/new'>
                            <Button aria-label="new-events" color="primary" variant="contained">
                                Create Event
                            </Button>
                        </Link>
                        {dataDisplay}
                    </div>
                </Grid>
            </div>
        )
    }
}

EventByID.propTypes = {
    getEventByID: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})

const mapActionsToProps = {
    getEventByID
}


export default connect(mapStateToProps, mapActionsToProps)(EventByID)