import React from 'react';
import '../../stylesheets/common.css'
import EventCard from '../../components/events-components/event-card'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';

//Redux
import { connect } from 'react-redux'
import { getEvents } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

//Resources
import nothing_img from '../../resources/images/nothing_found.png'

//Analytics
import {firebaseAnalytics} from '../../utils/firebase'

class Events extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            
        }
    }

    componentDidMount()
    {
        this.props.getEvents(); 
        firebaseAnalytics.logEvent(`events_visited`);
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

        let dataDisplay = null
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            dataDisplay = []
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
        
        let myEventsButton = authenticated && user ? 
        <Link href={`/events/user/${user.userHandle}`}>
            Show my events only
        </Link>
        :
        null; 

        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <p className="title">Events in Arizona</p>
                        <Link href='/events/new'>
                            <Button aria-label="new-events" color="primary" variant="contained">
                                Create Event
                            </Button>
                        </Link>
                        <div className="show-my-events-only">
                            {myEventsButton}
                        </div>
                        {dataDisplay}
                    </div>
                </Grid>
            </div>
        )
    }
}

Events.propTypes = {
    getEvents: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired, 
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data, 
    user: state.user
})

const mapActionsToProps = {
    getEvents
}


export default connect(mapStateToProps, mapActionsToProps)(Events)