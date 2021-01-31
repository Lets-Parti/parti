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
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';

//Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//Components
import ReviewCard from '../components/user-components/review-card';
import ConnectModal from '../components/modal-component/connectmodal';
import GalleryModal from '../components/modal-component/gallerymodal';
import {CopyToClipboard} from 'react-copy-to-clipboard';


//Material UI Icons
import MessageIcon from '@material-ui/icons/Message';
import ReviewIcon from '@material-ui/icons/RateReview';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import PhoneIcon from '@material-ui/icons/Phone';
import WebIcon from '@material-ui/icons/Web';

//Redux
import { getUserByHandle, addReview, editReview } from '../redux/actions/dataActions'

//Analytics
import {firebaseAnalytics} from '../utils/firebase'

class User extends React.Component {
  constructor(props) {
    super()
    this.state = {
      errors: {},
      toggleAddReviewComp: false,
      reviewBody: '',
      rating: 0,
      modalOpen: false,
      galleryModalOpen: false,
      editReview: false,
      anchorEl: null,
      copyClipboardAlert: false,
    };

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openGalleryModal = this.openGalleryModal.bind(this); 
    this.closeGalleryModal = this.closeGalleryModal.bind(this); 
    this.toggleEditReview = this.toggleEditReview.bind(this);
    this.toggleCancel = this.toggleCancel.bind(this);
    this.visitSocial = this.visitSocial.bind(this); 
    this.toggleShowPhoneNumber=this.toggleShowPhoneNumber.bind(this);
    this.copyClipboardAlert = this.copyClipboardAlert.bind(this);
  }

  handleTextChange(event) {
    this.setState({ reviewBody: event.target.value });
  }

  handleRatingChange(event) {
    this.setState({ rating: event.target.value })
  }

  handleSubmit() {
    const company = this.props.data.user.userHandle
    const rating = this.state.rating
    const body = this.state.reviewBody

    if (body === "") {
      alert("The review cannot be empty");
    }
    else {
      let data = {
        userHandle: company,
        rating: parseFloat(rating),
        body: body
      }
      if (this.state.editReview === true) {
        this.props.editReview(data);
      }
      else {
        this.props.addReview(data);
      }
    }
  }

  openModal() {
    const userHandle = this.props.data.user.userHandle
    firebaseAnalytics.logEvent(`message_modal_open_${userHandle}`);
    this.setState({
      modalOpen: true
    })
  }

  copyClipboardAlert() {
    alert('Profile link copied to clipboard.')
  }

  closeModal() {
    this.setState({
      modalOpen: false
    })
  }

  openGalleryModal() {
    this.setState({
      galleryModalOpen: true
    })
  }

  closeGalleryModal() {
    this.setState({
      galleryModalOpen: false
    })
  }

  redirect() {
    window.location.href = '/login'
  }

  componentDidMount() {
    const userHandle = this.props.match.params.userHandle;
    const promoID = this.props.match.params.promoID; 
    firebaseAnalytics.logEvent(`user_visited_${userHandle}`);
    if(promoID)
    {
      firebaseAnalytics.logEvent(`promo_1_clicked_${promoID}_${userHandle}`);
    }
    this.props.getUserByHandle(userHandle);
  }

  toggleAddReview() {
    this.setState({toggleAddReviewComp: true});
  }

  toggleEditReview() {
    this.setState({
      toggleAddReviewComp: true,
      editReview: true
    })
  }

  toggleCancel() {
    this.setState({
      toggleAddReviewComp: false,
      editReview: false
    })
  }

  toggleShowPhoneNumber= (event) =>{
    if (!Boolean(this.state.anchorEl)){
      this.setState({anchorEl: event.currentTarget})
    }
    else{
      this.setState({anchorEl: null})
    }
  }

  visitSocial(social)
  {
    const userHandle = this.props.data.user.userHandle;
    firebaseAnalytics.logEvent(`${social}_visited_${userHandle}`);
  }

  render() {
    const { toggleAddReviewComp } = this.state;
    const { user, isLoading } = this.props.data;
    const { authenticated } = this.props.user;

    let authenticatedUser;
    let authenticatedUserType; 
    if (authenticated) {
      authenticatedUser = this.props.user.user;
      authenticatedUserType = this.props.user.user.type; 
    }

    let connectModal = authenticated && user && !isLoading ?
      <ConnectModal open={this.state.modalOpen} handleClose={this.closeModal} userHandle={user.userHandle} />
      :
      null
    let galleryModal; 

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

    let circularProgress = null;
    let firstRow = null;
    let socialsRow = null;
    let contactsRow = null; 
    let imageGallerySection = null;
    let bioSection = null;
    let reviewsSection = null;
    let reviewButton = null;
    let phoneNumberDisplay;

    if (user && !isLoading) {
      let userDisplay = user.fullName
      let userHandle = user.userHandle
      let userProfileImageURL = user.imageUrl
      let imageGallery = user.mediaImages
      let bio = user.bio
      let tags = user.tags
      let city = user.city; 
      let state = user.state;

      let instagram = user.instagram
      let facebook = user.facebook
      let website = user.website

      let socialButtons = []; 

      if(instagram)
      {
        socialButtons.push(
          <Link href={`https://www.instagram.com/${instagram}`} target="_blank">
            <Tooltip title="Instagram">
              <IconButton aria-label="delete" color="primary" size='small' onClick={() => {this.visitSocial("instagram")}}>
                <InstagramIcon />
              </IconButton>
            </Tooltip>
          </Link>
        )
      }
      if(facebook)
      {
        socialButtons.push(
          <Link href={`https://${facebook}`} target="_blank">
            <Tooltip title="Facebook">
            <IconButton aria-label="delete" color="primary" size='small' onClick={() => {this.visitSocial("facebook")}}>
              <FacebookIcon />
            </IconButton>
          </Tooltip>
        </Link>
        )
      }
      if(website)
      {
        socialButtons.push(
          <Link href={`http://${website}`} target="_blank">
          <Tooltip title="Website">
            <IconButton aria-label="delete" color="primary" size='small' onClick={() => {this.visitSocial("website")}}>
              <WebIcon />
            </IconButton>
          </Tooltip>
        </Link>
        )
      }

      const unauthorizedPhoneMessage = ['Please ', <Link href="/login">log in</Link>, ' or ', <Link href="/signup">sign up.</Link>];
      phoneNumberDisplay =
      <div>
        <Tooltip title="Call">
          <IconButton color="primary" onClick={this.toggleShowPhoneNumber} size='small' ><PhoneIcon/></IconButton>
        </Tooltip>
        <Popover 
        open={Boolean(this.state.anchorEl)}
        anchorEl={this.state.anchorEl}
        onClose={this.toggleShowPhoneNumber}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}>
          <div className='phone-number'>
            {authenticated ? <Link href={`tel:${user.phone}`}>{user.phone}</Link> 
            : 
            unauthorizedPhoneMessage}
          </div>
        </Popover>
      </div>

      let cityState; 
      if(city && state)
      {
        cityState = <span className="city-state">{city}, {state}</span>
      }

      let reviews = user.reviews;
      let totalRating = 0; 
      reviews.forEach(review =>
      {
        totalRating += review.rating; 
      })
      
      let averageRating = reviews.length > 0 ? parseFloat(1.0 * totalRating / reviews.length).toFixed(1) : 0;

      const StyledRating = withStyles({
        iconFilled: {
          color: '#31b6ec'
        }
      })(Rating);

      let numReviews = <span className="user-page-num-reviews">({reviews.length})</span>
      let numReviews_alt = <span className="user-page-num-reviews">({reviews.length} reviews)</span>

      let blueStar =
        <StyledRating
          value={1}
          readOnly
          defaultValue={1}
          max={1}
          className="icon-filled"
        />
           
      let ratingDisplay = (
        <Grid container>
            {blueStar} 
            <span className="ratings-text"> {averageRating}{numReviews}</span>
            {cityState}
        </Grid>
      );

      let ratingDisplay_alt = (
        <Grid container>
          {blueStar} 
          <span className="ratings-text"> {averageRating} {numReviews_alt}</span>
        </Grid>
        );
    
      let reviewCards = [];

      reviews.forEach(review => {
        if (authenticated && review.author_userHandle === authenticatedUser.userHandle) {
          this.state.editReview = true;
        }
        reviewCards.push(
          <ReviewCard data={review} />
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
              value={this.state.rating}
              onChange={this.handleRatingChange}
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
            onClick={() => this.toggleCancel()}
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
      });

      galleryModal = <GalleryModal open={this.state.galleryModalOpen} handleClose={this.closeGalleryModal} items={carouselImages}/>;

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
      
      firstRow = (
        <div className="user-page-first-row">
          <Grid container spacing={2} justify="space-between">
            <Grid container item spacing={2} xs={11} sm={9}>
              <Grid item className="grid-item" sm={1} xs={2}>
                  <img className="user-profile-image" src={userProfileImageURL} alt="User Profile"/>
              </Grid>
              <Grid container item className="grid-item" sm={10} xs={9}>
                <div className="user-company-info">
                  <Grid item sm={12} xs={12}>
                    <div className="user-company-name">
                      {userDisplay}
                    </div>
                  </Grid>
                  <Grid item sm={12} xs={12} alignItems="center" justify="flex-start">
                    {ratingDisplay}
                  </Grid>
                </div>
              </Grid>
            </Grid>

            <Grid container item className="grid-item"  justify="flex-end" xs={1} sm={1}>
                 <div className="message-button-large">
                   {chatButton}
                 </div>
                 <div className="message-button-small">
                   {smallChatButton}
                 </div>
            </Grid>
          </Grid>
        </div>
      )

      socialsRow = (
        <Grid container>
          <Grid item sm={1} xs={2} align="left">
            {phoneNumberDisplay}
          </Grid>
          <Grid item sm={5} xs={4} align="left"> 
            {socialButtons}
          </Grid>
          <Grid item sm={6} xs={6} align="right">
            <CopyToClipboard
              text={`https://parti.app/user/${userHandle}`}>      
                <Button aria-label="message" color="primary" variant="outlined" onClick={this.copyClipboardAlert}
                startIcon={<ShareIcon />}
                display='none'
                size='small'
                >
                Share
                </Button>
            </CopyToClipboard>
          </Grid>
        </Grid>
      );

      let highlightPhoto; 
      let subPhotos = [];
      let viewGalleryButton; 
      if(carouselImages.length > 0)
      {
        highlightPhoto = 
        <Link href="#">
          <Tooltip title="View Gallery">
            <img src={carouselImages[0].original} className="image-gallery-highlight-photo" onClick={() => this.openGalleryModal()}/>
          </Tooltip>
        </Link>
        
        viewGalleryButton =               
        <Button aria-label="message" color="primary" variant="outlined" onClick={this.openGalleryModal}
          display='none'>
          View Gallery
        </Button>

        for(var i = 1; i < Math.min(carouselImages.length, 5); i++)
        {
          subPhotos.push(
            <Grid item sm={6} xs={6} className="image-gallery-photo-item">
              <Link href="#">
              <Tooltip title="View Gallery">
                <img src={carouselImages[i].original} className="image-gallery-sub-photo" onClick={() => this.openGalleryModal()}/>
              </Tooltip>
              </Link>
            </Grid>
          )
        }
      }
        
      imageGallerySection = (
        <Grid container>
            <Grid item sm={6} xs={12} className="image-gallery-photo-item">
                {highlightPhoto}
            </Grid>
            <Grid item sm={6} xs={12}>
              <Grid container>
                {subPhotos}
              </Grid>
            </Grid>
            <Grid item sm={12} xs={12} align="right">
                {viewGalleryButton}
            </Grid>
        </Grid>
      );

      bioSection = (
        <Grid container spacing={4}>
          <Grid item xs={12} className="review-text">
            {bio}
          </Grid>
          <Grid item xs={12} align="left">
            {chips}
            </Grid>
        </Grid>        
      );
      

      let reviewButtonText = '';
      if (this.state.editReview === true) {
        reviewButtonText = 'Edit Review';
      }
      else {
        reviewButtonText = 'Add Review';
      }

      reviewButton = (
        <>
          <div className="review-button-large">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ReviewIcon />}
              display='none'
              onClick={() => this.toggleAddReview()}
            >
              {reviewButtonText}
            </Button>
          </div>
          <div className="review-button-small">
            <IconButton aria-label="delete" color="primary" onClick={() => this.toggleAddReview()}>
              <ReviewIcon />
            </IconButton>
          </div>
        </>
      );
      reviewsSection = (
        <div className="reviews-section">
        <hr className="hrmargin"></hr>
        <Grid container className="row">
          <Grid item className="grid-item" align="left" sm={10} xs={10}>
            <h2>Reviews</h2>
            {ratingDisplay_alt} 
          </Grid>
          <Grid item className="grid-item" sm={2} xs={2}>
            {authenticated && authenticatedUserType === 'client' && reviewButton}
          </Grid>
          {toggleAddReviewComp && createReview}
        </Grid>
        
        <Grid container>
          {reviewCards}
        </Grid>
        <br></br>
      </div>
      )
    } 
    else 
    {
      circularProgress = <CircularProgress />
    }

    return (
      <div className="user-container">
        {galleryModal}
        {connectModal}
        {circularProgress}
        {firstRow}
        {socialsRow}
        {imageGallerySection}
        <br></br>
        <br></br>
        {bioSection}
        <br></br>
        <br></br>
        {reviewsSection}
      </div>
    )
  }
}

User.propTypes = {
  getUserByHandle: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user
})

const mapActionsToProps = {
  getUserByHandle, addReview, editReview
}

export default connect(mapStateToProps, mapActionsToProps)(User)