import React from 'react';
import '../../stylesheets/connect.css'

//MaterialUI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUserByHandle } from '../../redux/actions/dataActions'

import {cleanDate} from '../../utils/validators';

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

    render() {
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
            <Link href={`/user/${this.state.connectHandle}`}>{this.state.connectHandle}</Link>
        ) : (
            <span>{this.state.connectHandle}</span>
        );

        let date = new Date(this.state.date).toString(); 
        date = cleanDate(date);                                     //Clean up what is displayed as the event date & time

        return (
            <Card variant="outlined" className="connect-card">
                <Grid container align="left">
                    <Grid item sm={6} xs={6}>
                        <span className="connect-tag">
                            {tag}{userTag}
                        </span>
                    </Grid>
                    <Grid item sm={6} xs = {6}>
                        <div className="connect-date">
                            {date.toString()}
                        </div>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <p className="connect-body">
                            {this.state.body}
                        </p>   
                    </Grid>
                </Grid>
            </Card>
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