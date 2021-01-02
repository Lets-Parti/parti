import React from 'react';
import '../../stylesheets/connect.css'

//MaterialUI
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'

//Icons 
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUserByHandle } from '../../redux/actions/dataActions'



class ConnectCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connectHandle: this.props.data.otherHandle,
            body: this.props.data.body,
            date: this.props.data.date,
            sent: this.props.data.sent
        }
    }

    // componentDidMount() {
    //     this.props.getUserByHandle();
    // }

    render() {
        /*
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
        */
        
        const { authenticated, user } = this.props.user;
        let userType;
        if (authenticated && user) {
            userType = user.type;
        }
        
        console.log(this.state);
        let tag = this.state.sent ? (
            <span className="connect-to">To: </span>) : (
                <span className="connect-from">From: </span>)
            ;
        let userTag = (userType === 'client') ? (
            <a href={`/user/${this.state.connectHandle}`}>{this.state.connectHandle}</a>
        ) : (
            <span>{this.state.connectHandle}</span>
        );
        return (
            <Grid className="connectCard">
                <div>
                    <span className="connect-tag">
                        {tag}{userTag}
                    </span>
                    <div className="connect-date">
                        {this.state.date}
                    </div>
                    <body className="connect-body">
                        {this.state.body}
                    </body>           
                </div>
            </Grid>
        )
    }
}

ConnectCard.propTypes = {
    getUserByHandle: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    getUserByHandle
}

export default connect(mapStateToProps, mapActionsToProps)(ConnectCard)