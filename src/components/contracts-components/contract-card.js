import React, { Component } from 'react';

//Material UI Components
import Grid from '@material-ui/core/Grid';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import '../../stylesheets/contract.css'
import '../../stylesheets/common.css'

import { connect } from 'react-redux'
import { deleteContract, signContract } from '../../redux/actions/dataActions'
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
        this.signContract = this.signContract.bind(this); 
    }

    deleteContract()
    {
        this.props.deleteContract(this.state.contractID); 
    }

    signContract()
    {
        this.props.signContract(this.state.contractID); 
    }

    render(props)
    {
        const {authenticated, user} = this.props.user
        let createdAtDate = this.state.createdAt.split('T')[0];
        let signedAt = this.state.signed ? this.props.data.signedAt.split('T')[0] : null; 
        let deletedAt = this.state.active ? null : this.props.data.deletedAt.split('T')[0]; 
        let chips = []; 
        let cancelButton = null; 
        let signButton = null; 

        let contractStatus = this.state.active ? 
            <Tooltip title="Contract Active">
                <CheckCircleOutlineIcon className="greenText" /> 
            </Tooltip>
            : 
            <div>
            <Tooltip title="Contract Inactive">
                <CancelIcon className="redText" />
            </Tooltip>
            <p className="redText"> Cancelled on {deletedAt}</p>
            </div>
        
        let signedStatus = this.state.signed ? 
            <div>
                <Tooltip title="Signed">
                    <CheckCircleOutlineIcon className="greenText" />
                </Tooltip>
                <p className="greenText"> Signed on {signedAt}</p>
            </div>
            :
            <div>
                <Tooltip title="Signature Waiting">
                    <HelpOutlineIcon className="orangeText"/>
                </Tooltip>
                <p className="orangeText">Waiting for signature</p>
            </div>


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
        
        if(this.state.active && this.state.eventDate > new Date().toISOString())           //If contract is active and event date is in the future
        {
            cancelButton = 
            <Tooltip title="Cancel Contract">
                <Button
                    variant="outlined"
                    onClick={this.deleteContract}
                    color="primary"
                >
                    Cancel   
                </Button>
            </Tooltip>
        }

        if(authenticated && user.type === 'client' && !this.state.signed)
        {
            signButton = 
            <Tooltip title="Sign Contract">
                <Button
                    variant="outlined"
                    onClick={this.signContract}
                    color="primary"
                >
                    Sign Contract
                </Button>
            </Tooltip>
        }

        return(
           <div>
           <div className="contractCard">
                <div className="contract-card-container">
                    <Grid container align="left">

                        <Grid item sm={9} xs={9}>
                            {contractStatus}
                            <p>Contract ID <span className="code">{this.state.contractID}</span></p>
                            <p>Created by <a href={`/user/${this.state.serviceHandle}`}>@{this.state.serviceHandle}</a> on {createdAtDate}</p>
                        </Grid>
                        <Grid item sm={3} xs={3} align="right">
                            {cancelButton}
                        </Grid>
                        <Grid item sm={12} xs={12}><hr /></Grid>

                        <Grid item sm={9} xs={9}>
                            {signedStatus}
                            <p>Event Host: @{this.state.clientHandle}</p>
                            <p>Event ID: <span className="code">{this.state.eventID}</span></p>
                        </Grid>
                        <Grid item sm={3} xs={3} align="right">
                            {signButton}
                        </Grid>
                        <Grid item sm={12} xs={12}><hr /></Grid>

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
    deleteContract: PropTypes.func.isRequired, 
    signContract: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    deleteContract, signContract
}

export default connect(mapStateToProps, mapActionsToProps)(ContractCard)
