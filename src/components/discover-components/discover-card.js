import React, { Component } from 'react';

//MaterialUI Components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import Chip from '@material-ui/core/Chip';
import ConnectModal from '../modal-component/connectmodal'
import Tooltip from '@material-ui/core/Tooltip';
import { Rating } from '@material-ui/lab';
import '../../stylesheets/discover-card.css';
import '../../stylesheets/common.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';

//redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class DiscoverCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: this.props.data.fullName,
            userHandle: this.props.data.userHandle,
            bio: this.props.data.bio,
            zipcode: this.props.data.zipcode,
            tags: this.props.data.tags,
            mediaImages: this.props.data.mediaImages,
            profileImageUrl: this.props.data.imageUrl,
            modalOpen: false,
            reviews: this.props.data.reviews,
            city: this.props.data.city,
            state: this.props.data.state
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            modalOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalOpen: false
        })
    }

    redirect() {
        window.location.href = '/login'
    }

    render(props) {
        const { authenticated } = this.props.user; 

        let mediaImagesArray = this.state.mediaImages
        let highlightPhoto = null;
        if (mediaImagesArray && mediaImagesArray.length > 0) {
            highlightPhoto = < a href={`/user/${this.state.userHandle}`}><img className="highlight-photo" src={mediaImagesArray[0]} alt="Highlight"/></a>
        }

        let chips = [];
        this.state.tags.forEach(tag => {
            chips.push
            (
                <Chip
                    className="chip-padding"
                    color="primary"
                    label={tag}
                    style={{ fontSize: '.8rem' }} />
            )
        })

        //MODAL STUFF
        let connectModal = authenticated ? 
        <ConnectModal open={this.state.modalOpen} handleClose={this.closeModal} userHandle={this.state.userHandle}/> 
        : 
        null

        let chatButton = authenticated ? 
        <Tooltip title="Send Message">
        <IconButton aria-label="message" color="primary" onClick={this.openModal}>
            <ChatIcon />
        </IconButton>
        </Tooltip>
        : 
        <Tooltip title="Send Message">
        <IconButton aria-label="message" color="primary" onClick={this.redirect}>
            <ChatIcon />
        </IconButton>
        </Tooltip>

        let reviews = this.state.reviews;
        let totalRating = 0; 
        if (reviews) {
            reviews.forEach(review =>
            {
            totalRating += review.rating; 
            })
        }
        else {
            totalRating = 0;
        }
        
        let averageRating = reviews.length > 0 ? parseFloat(1.0 * totalRating / reviews.length).toFixed(2) : 0;

        const StyledRating = withStyles({
            iconFilled: {
              color: '#31b6ec'
            }
          })(Rating);
    
        let numReviews = <span className="greyText discover-card-ratings-text">({reviews.length})</span>
        let numReviews_alt = <span className="greyText discover-card-ratings-text">({reviews.length} reviews)</span>

        let blueStar =
        <StyledRating
            value={1}
            readOnly
            defaultValue={1}
            max={1}
            className="icon-filled"
            size="small"
        />
               
        let city = this.state.city;
        let state = this.state.state;
        let cityState = null;
        if(city && state)
        {
            cityState = <span className="discover-card-city-state">{city}, {state}</span>
        }

        let ratingDisplay = (
            <Grid container>
                {blueStar} 
                <span className="discover-card-ratings-text"> {averageRating}{numReviews}</span>
                {cityState}
            </Grid>
            );

        return (
            <div className="discover-card">
                {connectModal}
                <div className="discover-container">
                    <Grid container>
                        <Grid container xs={11} spacing={2}>
                            <Grid item className="grid-object" align="left">
                                <a href={`/user/${this.state.userHandle}`} >
                                    <img src={this.state.profileImageUrl} className="profile-image-discover-card" alt="Profile"/>
                                </a>
                            </Grid>
                            <Grid item className="grid-object" align="left">
                                <div className="left-padding">
                                    <a href={`/user/${this.state.userHandle}`} className="invisible-link">
                                        <p className="discover-card-full-name">{this.state.fullName}</p>
                                    </a>
                                    <Grid item className="discover-card-rating">
                                        {ratingDisplay}
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid xs={1} className="grid-object" align="right">
                            {chatButton}
                        </Grid>
                        <Grid sm={12} xs={12} className="separator" />
                        <Grid sm={6} xs={12} className="grid-object" align="left">
                            {highlightPhoto}
                        </Grid>
                        <Grid sm={6} xs={12} className="grid-object" align="left">
                            <div className="discover-card-bio-container">
                                <p className="discover-card-bio">
                                    {this.state.bio}
                                </p>
                                <div className="seperator" />
                                {chips}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

DiscoverCard.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {

}


export default connect(mapStateToProps, mapActionsToProps)(DiscoverCard)