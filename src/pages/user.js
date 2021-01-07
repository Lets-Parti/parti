import React from 'react';

//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/user.css'

//MaterialUI Imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { Rating } from '@material-ui/lab';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

import ConnectModal from '../components/modal-component/connectmodal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//Material UI Icons
import MessageIcon from '@material-ui/icons/Message';
import ReviewIcon from '@material-ui/icons/RateReview';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WebIcon from '@material-ui/icons/Web';
import DeleteIcon from '@material-ui/icons/Delete';


//Redux
import { getUserByHandle, addTheReview } from '../redux/actions/dataActions'

//Image Gallery (From Online) {https://www.npmjs.com/package/react-image-gallery}
import ImageGallery from 'react-image-gallery';
import { Menu } from '@material-ui/core';

class User extends React.Component {
  constructor(props) {
    super()
    this.state = {
      errors: {},
      toggleAddReviewComp: false,
      reviewBody: '',
      stars: 0,
      modalOpen: false,
      // userHandle: this.props.data.userHandle
    };
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleStarsChange = this.handleStarsChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleTextChange(event) {
    this.setState({ reviewBody: event.target.value });
  }

  handleStarsChange(event) {
    this.setState({ stars: event.target.value })
  }

  handleSubmit() {
    const company = this.props.data.user.userHandle
    const stars = this.state.stars
    const body = this.state.reviewBody

    if (body === "") {
      alert("The review cannot be empty")
    }
    else {
      let everything = {
        userHandle: company,
        stars: parseFloat(stars),
        body: body
      }
      this.props.addTheReview(everything)
    }
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

  componentDidMount() {
    const handle = this.props.match.params.userhandle
    this.props.getUserByHandle(handle)
  }

  toggleAddReview() {
    this.setState({toggleAddReviewComp: !this.state.toggleAddReviewComp});
  }

  render() {

    const { toggleAddReviewComp } = this.state;
    const { user, isLoading } = this.props.data;
    const { authenticated } = this.props.user;
    let authenticatedUser;
    if (authenticated) {
      authenticatedUser = this.props.user.user;
    }

    let connectModal = authenticated && user && !isLoading ?
      <ConnectModal open={this.state.modalOpen} handleClose={this.closeModal} userHandle={user.userHandle} />
      :
      null

    let chatButton = authenticated ?
      <Button aria-label="message" color="primary" variant="contained" onClick={this.openModal}
        startIcon={<MessageIcon />}
        display='none'>
        Message
        </Button>
      :
      <Button aria-label="message" color="primary" variant="contained" onClick={this.redirect}
        startIcon={<MessageIcon />}
        display='none'>
        Message
      </Button>

    let smallChatButton = authenticated ?
      <IconButton aria-label="message" color="primary" onClick={this.openModal}>
        <MessageIcon />
      </IconButton>
      :
      <IconButton aria-label="message" color="primary" onClick={this.redirect}>
        <MessageIcon />
      </IconButton>

    let fullProfile = null;
    let circularProgress = null;

    if (user && !isLoading) {
      let userDisplay = user.fullName
      let userHandle = user.userHandle
      let userProfileImageURL = user.imageUrl
      let imageGallery = user.mediaImages
      let bio = user.bio
      let tags = user.tags

      let instagram = user.instagram
      let facebook = user.facebook
      let website = user.website

      let socialButtons = []; 
      if(instagram)
      {
        socialButtons.push(
          <Link href={`https://www.instagram.com/${instagram}`} target="_blank">
            <Tooltip title="Instagram">
              <IconButton aria-label="delete" color="primary">
                <InstagramIcon />
              </IconButton>
            </Tooltip>
          </Link>
        )
      }

      if(facebook)
      {
        socialButtons.push(
          <Link href={facebook} target="_blank">
            <Tooltip title="Facebook">
            <IconButton aria-label="delete" color="primary">
              <FacebookIcon />
            </IconButton>
          </Tooltip>
        </Link>
        )
      }

      if(website)
      {
        socialButtons.push(
          <Link href={website} target="_blank">
          <Tooltip title="Website">
            <IconButton aria-label="delete" color="primary">
              <WebIcon />
            </IconButton>
          </Tooltip>
        </Link>
        )
      }

      let reviewData = user.reviews
      let averageStars = reviewData.averageStars
      let numberOfReviews = reviewData.numberOfReviews
      let reviews = reviewData.reviews

      let averageStarsDisplay =
        <Rating
          value={averageStars}
          readOnly
        />
      let ratingDisplay
      if (averageStars === 0) {
        ratingDisplay = <span>{averageStarsDisplay}({numberOfReviews})</span>
      }
      else {
        ratingDisplay = <span>{averageStarsDisplay}({numberOfReviews})</span>
      }


      let starsDisplay;
      let reviewCards = [];
      let editButton;
      reviews.forEach(review => {
        if (authenticated && review.userHandle === authenticatedUser.userHandle) {
          editButton = (
            <IconButton color="primary" onClick={() => this.toggleAddReview()}>
              <ReviewIcon />
            </IconButton>
          )
        }
        else {
          editButton = (null);
        }
        starsDisplay =
          <Rating
            value={review.stars}
            readOnly
          />
        reviewCards.push(
          <Grid container sm={4} xs={12} className="review-card">
            <Grid item sm={10} xs={10}>
              <p className="review-handle">@{review.userHandle}</p>
            </Grid>
            <Grid item sm={2} xs={2}>
              <p className="review-handle">{editButton}</p>
            </Grid>
            <Grid item sm={12} xs={12}>
              <p className="review-handle">{starsDisplay}</p>
            </Grid>
            <Grid item sm={12} xs={12}>
              <p className="review-body">{review.body}</p>
            </Grid>
          </Grid>
        )
      })

      let createReview =
        <>
        <Grid container sm={12} xs={12} spacing={1}>
          <Grid item sm={12} xs={12}>
            <h2>Add Your Review</h2>
          </Grid>
          <Grid item sm={12} xs={12}>
            <Rating
              value={this.state.stars}
              onChange={this.handleStarsChange}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              label="Please enter your review here"
              variant="outlined"
              size="large"
              value={this.state.reviewBody}
              onChange={this.handleTextChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        <Box mr={2} mt={2}>
          <Button
          variant="contained"
          color="primary"
          startIcon={<ReviewIcon />}
          display='none'
          onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Box>
        
        <Box mr={2} mt={2}>
          <Button
            variant="contained"
            color="white"
            startIcon={<ReviewIcon />}
            display='none'
            onClick={() => this.toggleAddReview()}
          >
            Cancel
          </Button>
        </Box>
      </>


      let carouselImages = [];                    //Initiate carousel data 
      imageGallery.forEach(imageURL => {
        carouselImages.push({
          original: imageURL,
          thumbnail: imageURL
        })
      })


      let chips = [];
      tags.forEach(tag => {
        chips.push
          (
            <Chip
              className="chip-padding"
              color="primary"
              label={tag}
              style={{ fontSize: '1rem' }} />
          )
      })
      let authUserHaveReview = -1;
      reviews.forEach(reviewBlock => {
        if(authenticated && reviewBlock.userHandle === authenticatedUser.userHandle) {
          authUserHaveReview = 1;
        }
      })
      if (authenticated && authenticatedUser.type === "client" && authUserHaveReview === -1) {
        fullProfile =
          <Grid container>
            {/* First Row */}
            <Grid container className="row">
              <Grid item className="grid-item" sm={1} xs={1} align="left">
                <img className="user-profile-image" src={userProfileImageURL} alt="User Profile"/>
              </Grid>
              <Grid item className="grid-item" sm={9} xs={9} align="left">
                <div className="user-page-title">
                  <p className="user-company-name">{userDisplay}</p>
                  <p className="user-handle">@{userHandle}</p>
                  {socialButtons}
                </div>
              </Grid>
              <Grid item className="grid-item" align="center" sm={2} xs={2}>
                <div className="message-button-large">
                  {chatButton}
                </div>
                <div className="message-button-small">
                  {smallChatButton}
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
              <hr className="hrmargin"></hr>
              <Grid container className="row">
                <Grid item className="grid-item" align="left" sm={10} xs={10}>
                  <h2>Reviews</h2>
                  {ratingDisplay}
                </Grid>
                <Grid item className="grid-item" sm={2} xs={2}>
                  <div className="review-button-large">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ReviewIcon />}
                      display='none'
                      onClick={() => this.toggleAddReview()}
                    >
                      Add Review
                    </Button>
                  </div>
                  <div className="review-button-small">
                    <IconButton aria-label="delete" color="primary" onClick={() => this.toggleAddReview()}>
                      <ReviewIcon />
                    </IconButton>
                  </div>
                </Grid>
                {toggleAddReviewComp && createReview}
              </Grid>
              <Grid container>
                {reviewCards}
              </Grid>
              {/* Below is ghetto spacing */}
              <br></br>
            </div>
          </Grid>
      }
      else {
        fullProfile =
          <Grid container>
            {/* First Row */}
            <Grid container className="row">
              <Grid item className="grid-item" sm={1} xs={1} align="left">
                <img className="user-profile-image" src={userProfileImageURL} alt="User Profile"/>
              </Grid>
              <Grid item className="grid-item" sm={9} xs={9} align="left">
                <div className="user-page-title">
                  <p className="user-company-name">{userDisplay}</p>
                  <p className="user-handle">@{userHandle}</p>
                  {socialButtons}
                </div>
              </Grid>
              <Grid item className="grid-item" align="center" sm={2} xs={2}>
                <div className="message-button-large">
                  {chatButton}
                </div>
                <div className="message-button-small">
                  {smallChatButton}
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
              <hr className="hrmargin"></hr>
              <Grid container className="row">
                <Grid item className="grid-item" align="left" sm={12} xs={12}>
                  <h2>Reviews</h2>
                  {ratingDisplay}
                </Grid>
                {toggleAddReviewComp && createReview}
              </Grid>

              <Grid container>
                {reviewCards}
              </Grid>
              {/* Below is ghetto spacing */}
              <br></br>
            </div>
          </Grid>
      }
    } 
    else 
    {
      circularProgress = <CircularProgress />
    }

    return (
      <div className="user-container">
        {connectModal}
        {circularProgress}
        {fullProfile}
      </div>
    )
  }
}

User.propTypes = {
  getUserByHandle: PropTypes.func.isRequired,
  addTheReview: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user
})

const mapActionsToProps = {
  getUserByHandle, addTheReview
}

export default connect(mapStateToProps, mapActionsToProps)(User)
