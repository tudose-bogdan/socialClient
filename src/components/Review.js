import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
import DeleteReview from './DeleteReview'
import ReviewDialog from './ReviewDialog'
//Mui
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography  from '@material-ui/core/Typography'
//Icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'


//Redux
import {connect} from 'react-redux'
import {likeReview, unlikeReview} from '../redux/actions/dataActions'

const styles = {
    card:{
        position:'relative',
        display: 'flex',
        marginBottom: 20 ,

    },
    image:{
        minWidth:200,
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    }

}

class Review extends Component {
    likedReview = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.criticId === this.props.review.reviewId))
            return true;
            else return false;
    };
    likeReview = () => {
        this.props.likeReview(this.props.review.reviewId);
    };
    unlikeReview = () => {
        this.props.unlikeReview(this.props.review.reviewId);
    }
    render() {
        dayjs.extend(relativeTime)
        const {classes, review: {body, createdAt, userImage, userHandle, reviewId, likeCount, commentCount},user:{authenticated, credentials: {handle}}} = this.props
        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
        ) : (
            this.likedReview() ? (
                <MyButton tip="Unlike" onClick={this.unlikeReview}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeReview}>
                <FavoriteBorder color="primary"/>
            </MyButton>
            )
        );
        const deleteButton = authenticated && userHandle === handle ? (
                <DeleteReview criticId={reviewId}/>
        ) : null
        return (
        <Card className={classes.card}>
            <CardMedia image={userImage}
            title="Profile image" className={classes.image} />

            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`}
                    color="primary">{userHandle}</Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                {likeButton}
                <span>{likeCount} Likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span>{commentCount} Comments</span>
                <ReviewDialog criticId={reviewId} userHandle={userHandle}/>
            </CardContent>
        </Card>
        )
    }
}

Review.propTypes = {
    likeReview: PropTypes.func.isRequired,
    unlikeReview: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeReview,
    unlikeReview
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Review));
