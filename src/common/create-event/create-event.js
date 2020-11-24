import React from 'react';
import '../create-event/create-event.css'
import StaticData from '../../static-data/static-data'

import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import ServiceForm from '../../components/create-event-components/service-form'

import Grid from '@material-ui/core/Grid';
import LinearWithValueLabel from '../../components/linearprogress-label'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class CreateEvent extends React.Component
{
    constructor()
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
        let max = StaticData.MAX_NUM_SERVICES
        if(this.state.services_count < max)
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
        console.log(this.state.services)
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