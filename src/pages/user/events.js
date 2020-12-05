import React, { Component } from 'react';
import '../../stylesheets/common.css'
import theme from '../../theme'
import Navbar from '../../components/navbar'
import EventCard from '../../components/event-card'
import Grid from '@material-ui/core/Grid';
import {ThemeProvider} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux'
import { getEvents } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'


import axios from 'axios'

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

        let dataDisplay = null
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            dataDisplay = []
            events.forEach(event => 
            {
                dataDisplay.push(<EventCard key={event.eventID} data={event}/>)    
            });
        }
        
        return(
            <div>
                <Navbar />
                <Grid align="center">
                    <ThemeProvider theme={theme}>
                    <div className="page-content">
                        <p className="title">My Events</p>
                        {dataDisplay}
                    </div>
                    </ThemeProvider>
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