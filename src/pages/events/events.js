import React from 'react';
import '../../stylesheets/common.css'
import EventCard from '../../components/events-components/event-card'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        this.analyticsTriggered = false; 
    }

    componentDidMount()
    {
        this.props.getEvents(); 
    }

    triggerAnalytics(user)
    {
        if(!this.analyticsTriggered)
        {
            console.log(`events_visited_${user.userHandle}`)
            firebaseAnalytics.logEvent(`events_visited${user.userHandle}`);
            this.analyticsTriggered = true; 
        }
    }

    render()
    {
        const {events, isLoading} = this.props.data; 
        const {user} = this.props.user; 

        if(user.userHandle)
        {
            this.triggerAnalytics(user); 
        }

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
            if(events.length === 0)
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
                        <p className="title">My Events</p>
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