import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../create-event/create-event.css'

import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import ServiceForm from '../../components/create-event-components/service-form'

import Grid from '@material-ui/core/Grid';
import LinearWithValueLabel from '../../components/linearprogress-label'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
      
let MAX_NUM_SERVICES = 5

class CreateEvent extends React.Component
{
    constructor(props)
    {
        super()
        this.state = {
            progress: 50,
            index: 0,
            services_count: 0,
            services: []
        }
        this.newService = this.newService.bind(this)
        this.deleteService = this.deleteService.bind(this)
    }

    newService()
    {
        if(this.state.services_count < MAX_NUM_SERVICES)
        {
            let newState = this.state.services.concat(
                <div>
                    <ServiceForm 
                        key={this.state.index} 
                        index={this.state.index} 
                        deleteMethod={this.deleteService}
                    />
                </div>
            )
    
            this.setState({
                index: this.state.index + 1, 
                services_count: this.state.services_count + 1,
                services: newState
            })
        }
    }

    deleteService(deleteTargetIndex)
    {
        var duplicate = this.state.services.slice()
        duplicate[deleteTargetIndex] = null

        this.setState({
            services: duplicate,
            services_count: this.state.services_count - 1
        })
    }

    render()
    {
        return(
            <div>
                <Navbar />
                
                <Grid align="center">
                <div className="page-content">

                        <p className="title">Create Event</p>

                        <div className="status-bar">
                            <LinearWithValueLabel value={this.state.progress}/>
                        </div>

                        <p className="question">What services are you looking for?</p>

                        {this.state.services}

                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={this.newService}
                        >
                            Add Service
                        </Button>

                </div>
                </Grid>

            <Footer />

            </div>
        )
    }
}

export default CreateEvent