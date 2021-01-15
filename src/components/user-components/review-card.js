import React from 'react';
import '../../stylesheets/review-card.css'

//MaterialUI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'

import { connect } from 'react-redux'
import {cleanDate, simpleDate} from '../../utils/validators';

class ReviewCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author_fullName: this.props.data.author_fullName,
            author_userHandle: this.props.data.author_userHandle,
            profile_photo_url: this.props.data.profile_photo_url, 
            rating: this.props.data.rating,
            body: this.props.data.body, 
            source: this.props.data.source, 
            source_url: this.props.data.source_url, 
            createdAt: this.props.data.createdAt
        }
    }

    render() {

        //Clean up date display
        let date = new Date(this.state.createdAt).toString(); 
        date = simpleDate(date); 

        return (
            <Grid item sm={6} xs={12}>
                <Grid container spacing={2}>
                    <Grid container xs={12} spacing={1}>
                        <Grid item align="left">
                            <img src={this.state.profile_photo_url} className="review-card-profile-pic"/>
                        </Grid>
                        <Grid item>
                            <p className="review-card-author-name">{this.state.author_fullName}</p>
                            <p className="review-card-created-date">{date}</p>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <p className="review-card-body">{this.state.body}</p>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

ReviewCard.propTypes = {

}

const mapStateToProps = (state) => ({

})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(ReviewCard)