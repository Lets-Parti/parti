import React, { Component } from 'react';

//MaterialUI Components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import Chip from '@material-ui/core/Chip';

import '../../stylesheets/discover-card.css';

class DiscoverCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            fullName: this.props.data.fullName, 
            userHandle: this.props.data.userHandle, 
            bio: this.props.data.bio, 
            zipcode: this.props.data.zipcode, 
            tags: this.props.data.tags,
            mediaImages: this.props.data.mediaImages,
            profileImageUrl: this.props.data.imageUrl
        }
    }

    render(props)
    {
        let tags = []
        this.state.tags.forEach(tag =>
        {
            tags.push(<p>{tag}</p>); 
        })
        
        let mediaImagesArray = this.state.mediaImages
        let highlightPhoto = null; 
        if(mediaImagesArray.length > 0)
        {
            highlightPhoto = <img className="highlight-photo" src={mediaImagesArray[0]} />
        }

        let chips = []; 
        this.state.tags.forEach(tag =>
        {
            chips.push
            (
                <Chip 
                className="chip-padding" 
                color="primary" 
                label={tag}
                style={{ fontSize: '.8rem' }}/>
            )
        })

        console.log(this.state)

        return(
                <div className="discover-card">
                    <div className="discover-container">
                        <Grid container>

                            <Grid sm={1} xs={1} className="grid-object">
                                <a href={`/user/${this.state.userHandle}`} >
                                    <img src={this.state.profileImageUrl} className="profile-image-discover-card"/>
                                </a>
                            </Grid>
                            <Grid sm={7} xs={9} className="grid-object" align="left">
                                <a href={`/user/${this.state.userHandle}`} className="invisible-link">
                                    <div className="left-padding">
                                        <p className="discover-card-full-name">{this.state.fullName}</p>
                                        <p className="discover-card-handle">@{this.state.userHandle}</p>
                                    </div>
                                </a>
                            </Grid>
                            <Grid sm={4} xs={1} className="grid-object" align="right">
                            <IconButton aria-label="message" color="primary">
                                <ChatIcon />
                            </IconButton>
                            </Grid>

                            <Grid sm={12} xs={12} className="separator"/>
                            <Grid sm={6} xs={12} className="grid-object" align="left">
                                {highlightPhoto}
                            </Grid>
                            <Grid sm={6} xs={12} className="grid-object" align="left">
                                <div className="discover-card-bio-container">
                                    <p className="discover-card-bio">
                                        {this.state.bio}
                                    </p>
                                    <div className="seperator"/>
                                    {chips}
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
        )
    }
}

export default DiscoverCard