import React from 'react';
import '../../stylesheets/event.css'

//MaterialUI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//Icons 
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

//redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleEventService } from '../../redux/actions/dataActions'
import { withStyles } from '@material-ui/core/styles';

class ServiceCard extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            serviceType: this.props.data.serviceType, 
            description: this.props.data.description, 
            service: this.props.data.service,
            vendorFound: false,
            vendorFullName: '',
        }
        this.onToggle = this.onToggle.bind(this); 
        this.eventChange = this.eventChange.bind(this); 
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onToggle()
    {
        //Look at current status
        if(this.state.vendorFound)                  //Set the vendorFound to false
        {
            let data = {
                "vendorFullName": "",
                "serviceType": this.state.serviceType,
                "eventID": this.props.eventID
            }
            this.setState({
                vendorFound: !this.state.vendorFound,
                service: null,
                vendorFullName: ''
            })
            this.props.toggleEventService(data);
        }else
        {
            let data = {
                "vendorFullName": this.state.vendorFullName,
                "serviceType": this.state.serviceType,
                "eventID": this.props.eventID
            }
            if(this.state.vendorFullName.length === 0)
            {
                this.setState({
                    errors: "Vendor name cannot be empty"
                })
            }else
            {
                this.setState({
                    vendorFound: !this.state.vendorFound,
                    errors: null,
                })
                this.props.toggleEventService(data);
            }
        }
    }

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm()
    {
        let data = {
            "vendorFullName": this.state.vendorFullName,
            "serviceType": this.state.serviceType,
            "eventID": this.props.eventID
        }
        this.setState({
            showForm: !this.state.showForm
        })
        this.props.toggleEventService(data); 
    }


    componentDidMount()
    {
        this.setState({vendorFound: this.state.service !== null});
    }

    render()
    {
        console.log(this.state.vendorFound)
        const { authenticated, user } = this.props.user; 

        let statusText = this.state.vendorFound ? 
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

        let toggleFeatures = authenticated && user.userHandle == this.props.userHandle ? 
        <div className="toggle-features">
            <p className="searchStatusText">What's the status of your search for a {this.state.serviceType}?</p>
            <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Still searching</Grid>
            <Grid item>
                <Switch checked={this.state.vendorFound} onChange={this.onToggle} color="primary"/>
            </Grid>
            <Grid item>Vendor found</Grid>
            </Grid>
            <TextField
                label="Vendor Name" 
                variant="outlined" 
                size="small" 
                fullWidth='true'
                name='vendorFullName'
                onChange={this.eventChange}
                value={this.state.vendorFullName}
                helperText={this.state.errors}
                error={this.state.errors}
            />
        </div>
        :
        null;

        let vendorProfile = this.state.vendorFound && this.state.service !== null ? 
        <div className="service-card-vendor-profile">
            <p>{this.state.serviceType} for this event</p>
            <Grid container>
                <Grid item sm={1} xs={1}>
                    <Tooltip title="Visit Profile">
                        <Link href={`/user/${this.state.service.userHandle}`}>
                            <img className="user-profile-image-event-card" src={this.state.service.imageUrl} alt="User Profile"/>
                        </Link>
                    </Tooltip>
                </Grid>
                <Grid item sm={11} xs={11}>
                    <Link href={`/user/${this.state.service.userHandle}`}>
                        <p className="host-name">{this.state.service.fullName}</p>
                    </Link>
                </Grid>
            </Grid>
        </div>
        :
        null; 


        return(
            <div className="serviceCard">
                <Card variant="outlined">
                    <div className="serviceCardContainer">
                        <Grid container>
                            <Grid item xs={10} sm={10}>
                                <Tooltip title={`Search for ${this.state.serviceType}`}>
                                    <Link href={`/discover/${this.state.serviceType}`}>
                                        <p className="serviceCardHeader">{this.state.serviceType}</p>
                                    </Link>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2} sm={2} align="right">
                                {statusText}
                            </Grid>
                        </Grid>

                        <p className="serviceCardDescription">{this.state.description}</p>
                        {toggleFeatures}
                        {vendorProfile}
                    </div>
                </Card>
            </div>
        )
    }
}

ServiceCard.propTypes = {
    user: PropTypes.object.isRequired,
    toggleEventService: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    toggleEventService
}


export default connect(mapStateToProps, mapActionsToProps)(ServiceCard)