import React from 'react';
//Components
import Chips from 'react-chips';

//Stylesheets
import '../../stylesheets/common.css'
import '../../stylesheets/account-edit.css'

//MaterialUI Imports 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

//Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';

//Redux
import { connect } from 'react-redux'
import { updateUserProfile, uploadProfileImage, uploadMediaImage, deleteMediaImage } from '../../redux/actions/userActions'
import PropTypes from 'prop-types'

//Static Data
import StaticData from '../../static/static-data'

//Utils
import {resizeProfileImage, resizeMediaImage} from '../../utils/imageutils'


class AccountEdit extends React.Component
{
    constructor()
    {   
        super()
        this.state = {
            errors: {},
            onUpdateProfile: false
        }
        this.onUpdateProfile = this.onUpdateProfile.bind(this); 
        this.eventChange = this.eventChange.bind(this); 
        this.onSubmitProfile = this.onSubmitProfile.bind(this); 
        this.onChangeChips = this.onChangeChips.bind(this); 
        this.handleProfileImageChange = this.handleProfileImageChange.bind(this); 
        this.handleMediaImageChange = this.handleMediaImageChange.bind(this); 
        this.onDeleteMediaImage = this.onDeleteMediaImage.bind(this); 
    }   

    eventChange(event)
    {
        let user = this.state.user; 
        user[event.target.name] = event.target.value; 
        this.setState({
            user
        })
    }

    onClickProfile(event)
    {
        const fileInput = document.getElementById('imageInput');
        fileInput.click(); 
    }

    onClickUploadMedia(event)
    {
        const fileInput = document.getElementById('imageGalleryInput'); 
        fileInput.click(); 
    }
    
    async handleProfileImageChange(event)
    {
        const image = event.target.files[0]; 
        let newImage = await resizeProfileImage(image); 
        const formData = new FormData(); 
        formData.append('image', newImage, image.name); 
        this.props.uploadProfileImage(formData); 
    }

    async handleMediaImageChange(event)
    {
        console.log(this.props.user.user.mediaImages.length)
        if(this.props.user.user.mediaImages.length >= StaticData.MAX_MEDIA_IMAGES)
        {
            alert(`Cannot have more than ${StaticData.MAX_MEDIA_IMAGES} images in gallery`);
        }
        const image = event.target.files[0]; 
        let newImage = await resizeMediaImage(image); 
        const formData = new FormData(); 
        formData.append('image', newImage, image.name); 
        this.props.uploadMediaImage(formData); 
    }

    onDeleteMediaImage(event)
    {
        let targetIndex = event.target.getAttribute("data-index");
        this.props.deleteMediaImage(targetIndex); 
    }

    onUpdateProfile()
    {
        this.setState({
            onUpdateProfile: true, 
            user: this.props.user.user
        });
    }

    onSubmitProfile()
    {
        this.props.updateUserProfile(this.state.user, this.state.user.type); 
    }

    onChangeChips(chips)
    {
        let user = this.state.user; 
        user.tags = chips
        this.setState({
            user
        })
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.UI.errors)
        {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }

    render()
    {   
        let {isLoading} = this.props.UI; 
        let circularProgress = isLoading ? <CircularProgress /> : null; 
        let userData = null
        let userDataForm = null
        let imageGallery = null
        let galleryContent = null
        let buttonDisplay = this.state.onUpdateProfile ? 
            <Button
                variant="contained"
                color="primary"
                onClick={this.onSubmitProfile}
                >
                Save Profile
            </Button>
        :
        <Button
            variant="outlined"
            color="primary"
            onClick={this.onUpdateProfile}
            >
            Update Profile
        </Button>

        if(this.props.user.user)
        {
            let user = this.props.user.user
            if(user.type === 'client')
            {
                let joinedDate = user.createdAt.split('T')[0]
                userData = 
                <div>
                    <Tooltip title="Edit profile picture" placement="top">
                        <a href="#" onClick={this.onClickProfile}>
                            <img className="profile-image" src={user.imageUrl}/>
                        </a>
                    </Tooltip>
                    <input type="file" id="imageInput" onChange={this.handleProfileImageChange} hidden="hidden"/>
                    <p className="user-handle">@{user.userHandle}</p>
                    <p className="full-name">{user.fullName}</p>
                    <p className="user-info"><LocationOnIcon fontSize="small" />{user.zipcode}</p>
                    <p className="user-info"><EventIcon fontSize="small" />Joined {joinedDate}</p>
                </div>
            }else if(user.type === 'service')
            {
                let joinedDate = user.createdAt.split('T')[0]
                userData = 
                <div>
                    <Tooltip title="Edit profile picture" placement="top">
                        <a href="#" onClick={this.onClickProfile}>
                            <img className="profile-image" src={user.imageUrl}/>
                        </a>
                    </Tooltip>
                    <input type="file" id="imageInput" onChange={this.handleProfileImageChange} hidden="hidden"/>
                    <a href={`/user/${user.userHandle}`}><p className="user-handle">@{user.userHandle}</p></a> 
                    <p className="full-name">{user.fullName}</p>
                    <p className="user-info"><LocationOnIcon fontSize="small" />{user.zipcode}</p>
                    <p className="user-info"><EventIcon fontSize="small" />Joined {joinedDate}</p>
                </div>

                //Generate Image Gallery
                imageGallery = []; 
                let index = 0; 
                user.mediaImages.forEach(imageURL =>
                {
                    imageGallery.push(
                        <Grid key={index} sm={6} xs={12}>
                            <div className="gallery-image-container">
                                <a href="#" onClick={this.onDeleteMediaImage}>
                                    <img className="gallery-image" data-index={index} src={imageURL} />
                                </a>
                            </div>
                        </Grid>
                    )
                    index++; 
                })

                //Generate Gallery Content
                galleryContent = 
                <div>
                    <div class="divider" />
                    <p className="heading">Image Gallery</p>
                    <hr></hr>
                    <p className="lightText">Click on an image to delete</p>
                    <div class="divider" />

                    <Grid container>
                        {imageGallery}
                    </Grid>

                    <div class="divider" />
                    <input type="file" id="imageGalleryInput" onChange={this.handleMediaImageChange} hidden="hidden"/>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onClickUploadMedia}
                        >
                        Upload Image
                    </Button>
                </div>
            }
        }

        //Conditional Rendering for the update profile form: 
        if(this.state.onUpdateProfile)
        {
            if(this.state.user.type === 'client')
            {
                userDataForm = 
                <div className="edit-form">
                    <TextField
                        label="Full Name" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='fullName'
                        onChange={this.eventChange}
                        value={this.state.user.fullName}
                        helperText={this.state.errors.fullName}
                        error={this.state.errors.fullName ? true : false}
                        />
                    <div className="divider" />
                    <TextField
                        label="Zipcode" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='zipcode'
                        onChange={this.eventChange}
                        value={this.state.user.zipcode}
                        helperText={this.state.errors.zipcode}
                        error={this.state.errors.zipcode ? true : false}
                        />
                </div>
            }else if(this.state.user.type === 'service')
            {
                let chip_options = [];
                StaticData.options.forEach(option =>
                {
                    chip_options.push(option.value);
                });

                userDataForm = 
                <div className="edit-form">
                    <TextField
                        label="Company Name" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='fullName'
                        onChange={this.eventChange}
                        value={this.state.user.fullName}
                        helperText={this.state.errors.fullName}
                        error={this.state.errors.fullName ? true : false}
                        />
                    <div className="divider" />
                    <TextField
                        label="Zipcode" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='zipcode'
                        onChange={this.eventChange}
                        value={this.state.user.zipcode}
                        helperText={this.state.errors.zipcode}
                        error={this.state.errors.zipcode ? true : false}
                        />
                    <div className="divider" />
                    <TextField
                        label="Bio" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='bio'
                        multiline
                        rows={5}
                        onChange={this.eventChange}
                        value={this.state.user.bio}
                        helperText={this.state.errors.bio}
                        error={this.state.errors.bio ? true : false}
                        />
                    <div className="divider" />
                    <p className="lightText">Tags (what services do you provide?)</p>
                    <Chips
                        value={this.state.user.tags}
                        onChange={this.onChangeChips}
                        suggestions={chip_options}
                    />
                </div>
            }
        }

        return(
            <Grid align="center">
            <div className="page-content">
                <div className="profile-container" >
                    {circularProgress}
                    {userData}
                    {userDataForm}
                    {buttonDisplay}
                    {galleryContent}
                </div>
            </div>
            </Grid>
        )
    }
}

AccountEdit.propTypes = {
    user: PropTypes.object.isRequired,
    uploadProfileImage:  PropTypes.func.isRequired,
    uploadMediaImage: PropTypes.func.isRequired,
    updateUserProfile: PropTypes.func.isRequired,
    deleteMediaImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    updateUserProfile, 
    uploadProfileImage, 
    uploadMediaImage, 
    deleteMediaImage
}

export default connect(mapStateToProps, mapActionsToProps)(AccountEdit)