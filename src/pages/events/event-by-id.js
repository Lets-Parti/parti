import React from 'react';
import '../../stylesheets/common.css'
import EventCard from '../../components/events-components/event-card'
import EventCardBView from '../../components/events-components/event-card-businessView'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

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

        let dataDisplay; 
        if(isLoading || !authenticated)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            if(authenticated && user.type === 'client')
            {
                dataDisplay = <EventCard data={events} />
            }else if(authenticated && user.type === 'service')
            {
                dataDisplay = <EventCardBView data={events} />
            }
        }
        
        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
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