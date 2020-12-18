
import React from 'react';
import Modal from '@material-ui/core/Modal';
import '../../stylesheets/feedback.css';

class ConnectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            userHandle: this.props.userHandle,
            body: '',
        }
    }

    render() {
        return
        (
            <Modal
                open={this.state.open}
                onClose={this.props.closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {/* <div>
                <Grid align="center">
                    <div className="page-content">
                        <div className="sign-up-form">
                        <p className="title">Contact</p>
                        <p className="lightText">Use this feature to establish a connection.</p>
                            <div className="feedback-form-container">
                                <TextField
                                    label="Type your first message here. This message will be emailed to the recipient" 
                                    variant="outlined" 
                                    size="large" 
                                    fullWidth='true'
                                    name='info'
                                    onChange={this.eventChange}
                                    value={this.state.info}
                                    multiline
                                    rows={15}
                                    
                                    helperText={this.state.errors.info}
                                    error={this.state.errors.info ? true : false}
                                    />
                                <div className="form-seperator"  />  
                                <div className="form-seperator" />
                            
                                {ButtonDisplay}

                                <div className="form-seperator" />
                               
                            </div>
                        </div>
                    </div>
                </Grid>
            </div> */}
                <p>MODAL</p>
            </Modal>
        )
    }
}

export default ConnectModal