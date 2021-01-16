import React from 'react';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import '../../stylesheets/feedback.css';
import './modalcomponent.css'
import ImageGallery from 'react-image-gallery';

import { connect } from 'react-redux'

class GalleryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                                <div className="modal">
                                <ImageGallery className="image-gallery" items={this.props.items}/>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={this.props.handleClose}
                                    className="gallery-modal-close-button"
                                >
                                    Close Gallery
                                </Button>
                                </div>
                            </div>
                        </Grid>
                    </div>
                </Card>
            </Modal>
        )
    }
}

GalleryModal.propTypes = {

}

const mapStateToProps = (state) => ({

})

const mapActionsToProps = {

}


export default connect(mapStateToProps, mapActionsToProps)(GalleryModal)