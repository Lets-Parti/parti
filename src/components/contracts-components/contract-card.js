import React, { Component } from 'react';

//Material UI Components
import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import '../../stylesheets/contract.css'
import '../../stylesheets/common.css'

import { connect } from 'react-redux'
import {deleteContract} from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core';


class ContractCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            clientMemo: this.props.data.clientMemo,
            serviceMemo: this.props.data.serviceMemo,
            contractID: this.props.data.contractID,
            active: this.props.data.active,
            tags: this.props.data.tags,
            createdAt: this.props.data.createdAt,
            fees: this.props.data.fees,
            eventID: this.props.data.eventID,
            body: this.props.data.body,
            clientHandle: this.props.data.clientHandle,
            eventDate: this.props.data.eventDate,
            serviceHandle: this.props.data.serviceHandle,
            signed: this.props.data.signed,
            totalCost: this.props.data.totalCost,
        }
        this.deleteContract = this.deleteContract.bind(this);
    }

    deleteContract()
    {
        this.props.deleteContract(this.state.contractID); 
    }

    render(props)
    {
        const {authenticated, user} = this.props.user
        let createdAtDate = this.state.createdAt.split('T')[0];
        let chips = []; 
        let cancelButton = null; 
        let contractStatus = this.state.active ? 
            <Tooltip title="Contract Active">
                <CheckCircleOutlineIcon className="greenText" /> 
            </Tooltip>
            : 
            <Tooltip title="Contract Inactive">
                <CancelIcon className="redText" />
            </Tooltip>

        this.state.tags.forEach(tag =>
        {
            chips.push
            (
                <Chip 
                color="primary" 
                label={tag}
                style={{ fontSize: '1rem' }}/>
            )
        })
        let fees = []; 
        this.state.fees.forEach(fee =>
        {
            fees.push(
                <Grid container className="fee">
                    <Grid sm={6} xs={6}>    
                        - {fee.name}
                    </Grid>
                    <Grid sm={6} xs={6}>    
                        ${fee.cost}
                    </Grid>
                </Grid>
            )
        })
        
        if(this.state.active)                       //If contract is active, show the cancel button
        {
            cancelButton = 
            <Button
                variant="outlined"
                onClick={this.deleteContract}
                color="primary"
            >
                Cancel   
            </Button>
        }

        if(authenticated && user.type === 'client')
        {

        }

        return(
           <div>
           <div className="contractCard">
                <div className="contract-card-container">
                    <Grid container align="left">
                        <Grid item sm={9} xs={9}>
                            {contractStatus}
                            <p>Contract ID <span className="code">{this.state.contractID}</span> by <a href={`/user/${this.state.serviceHandle}`}>@{this.state.serviceHandle}</a></p>
                            <p>Created on {createdAtDate}</p>
                            <hr />
                        </Grid>
                        <Grid item sm={3} xs={3} align="right">
                            {cancelButton}
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <p>Event Host: @{this.state.clientHandle}</p>
                            <p>Event ID: <span className="code">{this.state.eventID}</span></p>
                            <hr />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <p className="lightText">Contract Details: </p>
                            <p>{this.state.body}</p>
                            <p className="lightText">Services: </p>
                            {chips}
                            <hr />
                        </Grid>
                        <p className="lightText">Fees: </p>
                            {fees}
                        <Grid item sm={12} xs={12}>
                            <hr />
                        </Grid>
                        <Grid container className="fee">
                            <Grid item sm={6} xs={6}>

                                - Total Cost 
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <b>${this.state.totalCost}</b>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            </div>
        )
    }
}

ContractCard.propTypes = {
    user: PropTypes.object.isRequired,
    deleteContract: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    deleteContract
}

export default connect(mapStateToProps, mapActionsToProps)(ContractCard)
