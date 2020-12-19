import React from 'react';
import '../../stylesheets/event.css'

//MaterialUI
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'

//Icons 
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

class ServiceCard extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            serviceType: this.props.data.serviceType, 
            description: this.props.data.description, 
            service: this.props.data.service
        }
    }

    render()
    {
        let statusText = this.state.service !== null ? 
        <div className="vendorFoundIcon"><CheckCircleOutlineIcon /></div>
        :
        <div className="vendorNotFoundIcon"><HelpOutlineIcon /></div>
        
        let serviceDetail = this.state.service !== null ? 
        <div>
            <img src={this.state.service.imageURL} />
            <p>Confirmed with
                <a href={`/user/${this.state.service.userHandle}`} className="invisible-link"> @{this.state.service.userHandle}</a>
            </p>
            <Link href="/contracts">
                <Button variant="contained" color="primary">See Contract</Button>
            </Link> 
        </div>
        :
        <div>
            <p>Discover local {this.state.serviceType} services</p>
            <Link href="/discover">
                <Button variant="contained" color="primary">Discover</Button>
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
                            {serviceDetail}
                        </Grid>
                    </div>
                </Card>
            </div>
        )
    }
}

export default ServiceCard