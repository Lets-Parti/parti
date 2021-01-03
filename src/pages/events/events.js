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
    }

    render()
    {
        const {events, isLoading} = this.props.data; 

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
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getEvents
}


export default connect(mapStateToProps, mapActionsToProps)(Events)