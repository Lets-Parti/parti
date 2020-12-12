import React from 'react';
import '../../stylesheets/common.css'
// import '../../stylesheets/discover.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//Components
import EventCardBView from '../../components/events-components/event-card-businessView'

//Redux
import { connect } from 'react-redux'
import { discoverEvents } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'


class DiscoverEvents extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            service: '',
            discover_cards: [],
            isLoading: false
        }
    }
    componentDidMount()
    {
        this.props.discoverEvents(); 
    }

    handleChangeSelect(name, value) {
        this.setState({
            [name]: value
        })
        const query = {
            service: value.value
        }
        this.props.discover(query);
    }

    render() {
        console.log(this.state);
        const {discover, isLoading} = this.props.data; 

        let dataDisplay = null
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            dataDisplay = []
            discover.forEach(event => 
            {
                dataDisplay.push(<EventCardBView key={event.eventID} data={event}/>)    
            });
        }

        return (
            <Grid align="center">
                <div className="page-content">
                    <p className="title">Discover Events</p>
                    <p className="lightText">Here is a listing of events near you that are looking for your services!</p>
                    <div className="discoverSelect">
                    </div>
                    {dataDisplay}
                </div>
            </Grid>
        )
    }
}

DiscoverEvents.propTypes = {
    discoverEvents: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    discoverEvents
}


export default connect(mapStateToProps, mapActionsToProps)(DiscoverEvents)
