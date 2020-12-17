import React from 'react';
import '../../stylesheets/event.css'

//MaterialUI
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

//Icons 
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

class ServiceCardBView extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            serviceType: this.props.data.serviceType, 
            description: this.props.data.description, 
            vendorFound: this.props.data.vendorFound, 
            service: this.props.data.service
        }
    }

    render()
    {
        let statusText = this.state.service !== null ? 
        <div className="vendorFoundIcon">
            <Tooltip title="Vendor Already Found">
                <CheckCircleOutlineIcon />
            </Tooltip>
        </div>
        :
        <div className="vendorNotFoundIcon">
            <Tooltip title="Vendor Not Found">
                <HelpOutlineIcon />
            </Tooltip>
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
                    </div>
                </Card>
            </div>
        )
    }
}

export default ServiceCardBView