import React from 'react';
import '../../stylesheets/event.css'

//MaterialUI
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'

//Icons 
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

class ServiceCardBView extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            serviceType: this.props.data.serviceType, 
            description: this.props.data.description, 
            vendorFound: this.props.data.vendorFound, 
            service: JSON.stringify(this.props.data.service)
        }
    }

    render()
    {
        let statusText = this.state.vendorFound ? 
        <p className="vendorFoundText">Confirmed</p>
        :
        <div className="vendorNotFoundIcon"><HelpOutlineIcon /></div>


        let buttonGroup = this.state.vendorFound ? 
        null
        :
        <div>
            <p>Offer your {this.state.serviceType} service</p>
            <Link href="/discover">
                <Button variant="contained" color="primary">Offer</Button>
            </Link> 
        </div>

        return(
            <div className="serviceCard">
                <Card variant="outlined">
                    <div className="serviceCardContainer">
                        <Grid container>
                            <Grid item xs={10} sm={10}>
                                <p className="serviceCardHeader">{this.state.serviceType}</p>
                            </Grid>
                            <Grid item xs={2} sm={2} align="right">
                                {statusText}
                            </Grid>
                        </Grid>

                        <p className="serviceCardDescription">{this.state.description}</p>
                        <Grid align="center">
                            {buttonGroup}
                        </Grid>
                    </div>
                </Card>
            </div>

            // <div className="serviceCard">
            //     <p>{this.state.serviceType}</p>
            //     <p>{this.state.description}</p>
            //     <p>Status: {serviceStatus}</p>
            // </div>
            
        )
    }
}

export default ServiceCardBView