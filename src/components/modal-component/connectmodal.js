
import React from 'react';
import Modal from '@material-ui/core/Modal';
import '../../stylesheets/feedback.css';

class ConnectModal extends React.Component 
{
    constructor(props)
    {
        super(props); 

    }

    render(props)
    {
        return(
            <Modal
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <p>Modal</p>
            </Modal>
        )
    }
}

export default ConnectModal