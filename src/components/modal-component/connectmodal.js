import React from 'react';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import '../../stylesheets/feedback.css';

import { connect } from 'react-redux'
import { createConnect } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

class ConnectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userHandle: this.props.userHandle,
            body: '',
            errors: {},
            isLoading: false
        }
        this.eventChange = this.eventChange.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
    }

    eventChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm() {
        this.setState({                                                 //When submit, set isLoading to true and reset errors
            isLoading: true,
            errors: {}
        })
        let data = {
            body: this.state.body,
            userHandle: this.state.userHandle
        }
        this.props.createConnect(data)
        alert('Message sent');
        this.props.handleClose();
    }

    render(props) {
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Card>
                    <div>
                        <Grid align="center">
                            <div className="page-content">
                                <div className="sign-up-form">
                                    <p className="title">Connect with @{this.props.userHandle}</p>
                                    <p className="lightText">Send a connect request to {this.props.userHandle}. Your phone number and email address will automatically be sent to {this.props.userHandle}.</p>
                                    <div className="feedback-form-container">
                                        <TextField
                                            label="Please write your first message"
                                            variant="filled"
                                            size="large"
                                            fullWidth='true'
                                            name='body'
                                            onChange={this.eventChange}
                                            value={this.state.body}
                                            multiline
                                            rows={15}


                                            helperText={this.state.errors.body}
                                            error={this.state.errors.body ? true : false}
                                        />
                                        <div className="form-seperator" />
                                        <div className="form-seperator" />

                                        {/* {ButtonDisplay} */}

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.onSubmitForm}
                                        >
                                            Submit
                                        </Button>
                                        <div className="form-seperator" />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </div>
                </Card>
            </Modal>
        )
    }
}

ConnectModal.propTypes = {
    createConnect: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    createConnect
}


export default connect(mapStateToProps, mapActionsToProps)(ConnectModal)