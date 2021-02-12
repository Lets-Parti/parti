import React from 'react';
import '../../stylesheets/common.css'
import EventCard from '../../components/events-components/event-card'
import EventCardBView from '../../components/events-components/event-card-businessView'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import nothing_img from '../../resources/images/nothing_found.png'

//Redux
import { connect } from 'react-redux'
import { getEventByUser } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

class EventByUser extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            
        }
    }

    componentDidMount()
    {
        const userHandle = this.props.match.params.userHandle;
        this.props.getEventByUser(userHandle); 
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
                        <p className="title">My Events</p>
                        {dataDisplay}
                    </div>
                </Grid>
            </div>
        )
    }
}

EventByUser.propTypes = {
    getEventByUser: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})

const mapActionsToProps = {
    getEventByUser
}


export default connect(mapStateToProps, mapActionsToProps)(EventByUser)