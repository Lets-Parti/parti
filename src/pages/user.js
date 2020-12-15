import React from 'react';
import { Redirect } from 'react-router';

//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/user.css'

//MaterialUI Imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';

//Material UI Icons
import MessageIcon from '@material-ui/icons/Message';

//Redux
import { connect } from 'react-redux'
import { getUserByHandle } from '../redux/actions/dataActions'
import PropTypes from 'prop-types'

//Image Gallery (From Online) {https://www.npmjs.com/package/react-image-gallery}
import ImageGallery from 'react-image-gallery';

class User extends React.Component
{
    constructor()
    {
        super()
        this.state = {
          errors: {},
        }
    }

    componentDidMount()
    {
        const handle = this.props.match.params.userhandle
        this.props.getUserByHandle(handle);
    }

    render()
    {
        const {user, isLoading} = this.props.data;
        let fullProfile = null
        let circularProgress = null; 

        if(user && !isLoading) {
            let userDisplay = user.fullName
            let userHandle = user.userHandle
            let userProfileImageURL = user.imageUrl
            let imageGallery = user.mediaImages
            let bio = user.bio
            let tags = user.tags

            let reviewData = user.reviews
            let averageStars = reviewData.averageStars
            let numberOfReviews = reviewData.numberOfReviews
            let reviews = reviewData.reviews

            
            let reviewCards = [];
            reviews.forEach(review =>
            {
                reviewCards.push(
                  <Grid item sm={4} xs={12} className="review-card">
                      <p className="review-handle">@{review.userHandle} - ({review.stars}/5)</p>
                      <p className="review-body">{review.body}</p>
                  </Grid>
                )
            })

            let carouselImages = [];                    //Initiate carousel data 
            imageGallery.forEach(imageURL =>  
            {
                carouselImages.push({
                  original: imageURL, 
                  thumbnail: imageURL
                })
            })

            let chips = []; 
            tags.forEach(tag =>
            {
                chips.push
                (
                    <Chip 
                    className="chip-padding" 
                    color="primary" 
                    label={tag}
                    style={{ fontSize: '1rem' }}/>
                )
            })

            fullProfile =
            <Grid container>
                {/* First Row */}
                <Grid container className="row">
                  <Grid item className="grid-item" sm={1} xs={1} align="left">
                      <img className="user-profile-image" src={userProfileImageURL} />
                  </Grid>
                  <Grid item className="grid-item" sm={9} xs={9} align="left">
                      <div className="user-page-title">
                        <p className="user-company-name">{userDisplay}</p>
                        <p className="user-handle">@{userHandle}</p>
                      </div>
                  </Grid>
                  <Grid item className="grid-item" align="center" sm={2} xs={2}>
                      <div className="message-button-large">
                        <Button
                        variant="contained"
                        color="primary"
                        startIcon={<MessageIcon />}
                        display='none'
                        >
                                Message
                        </Button>
                      </div>
                      <div className="message-button-small">
                        <IconButton aria-label="delete" color="primary">
                            <ChatIcon />
                        </IconButton>
                      </div>
                  </Grid>
                </Grid>

                {/* Second Row */}
                <Grid container className="row">
                  <Grid container className="image-gallery" sm={6} xs={12}>
                    <ImageGallery items={carouselImages} />
                  </Grid>
                  
                  <Grid item className="grid-item-description" sm={6} xs={12}>
                    <div className="bio-container">
                      <p className="bio">{bio}</p>
                        {chips}
                    </div>
                  </Grid>
                </Grid>
                
                <div className="reviews-section">
                  <Grid item sm={12} xs={12}>
                      <hr></hr>
                      <p className="banner">Reviews</p>
                  </Grid>
                  <Grid container>
                    {reviewCards}
                  </Grid>
                  {/* Below is ghetto spacing */}
                  <br></br> 
                </div>
            </Grid>
        } else {
            circularProgress = <CircularProgress />
        }

        return(
            <div className="user-container">
              {circularProgress}
              {fullProfile}
            </div>
        )
    }
}

User.propTypes = {
    getUserByHandle: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
})

const mapActionsToProps = {
    getUserByHandle
}

export default connect(mapStateToProps, mapActionsToProps)(User)
