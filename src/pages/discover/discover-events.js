import React from 'react';
import '../../stylesheets/common.css'
// import '../../stylesheets/discover.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//Components
import DiscoverCard from '../../components/discover-components/discover-card'
import EventCard from '../../components/events-components/event-card'
import EventCardBView from '../../components/events-components/event-card-businessView'
import ServiceCardBView from '../../components/events-components/service-card-businessView'

//Redux
import { connect } from 'react-redux'
import { discover } from '../../redux/actions/dataActions'
import { discoverEventsActions } from '../../redux/actions/dataActions'
import { getEventsForDiscover } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

//Select
import Select from 'react-select'
import StaticData from '../../static/static-data'
import StaticDataZip from '../../static/static-data-for-zip'

class DiscoverEvents extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            
        }
    }

    componentDidMount()
    {
        this.props.getEventsForDiscover(); 
    }


    render() {
        console.log(this.state);
        const {events, isLoading} = this.props.data; 

        let dataDisplay = null
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            dataDisplay = []
            events.forEach(event => 
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
                         {/* <Select
                            options={StaticData.options}
                            styles="width:100px;"
                            id="select"
                            value={this.state.service}
                            onChange={this.handleChangeSelect.bind(this, "service")}
                        />  */}
                    </div>
                    {dataDisplay}
                </div>
            </Grid>
        )
    }
}

DiscoverEvents.propTypes = {
    getEventsForDiscover: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getEventsForDiscover
}


export default connect(mapStateToProps, mapActionsToProps)(DiscoverEvents)
