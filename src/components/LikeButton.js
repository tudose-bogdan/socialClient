import React, { Component } from 'react'
import MyButton from '../util/MyButton'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
//Redux
import {connect} from 'react-redux'
import {likeReview, unlikeReview} from '../redux/actions/dataActions'

export class LikeButton extends Component {
    likedReview = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.criticId === this.props.criticId))
            return true;
            else return false;
    };
    likeReview = () => {
        this.props.likeReview(this.props.criticId);
    };
    unlikeReview = () => {
        this.props.unlikeReview(this.props.criticId);
    }
    render() {
        const {authenticated} = this.props.user;
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
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    criticId: PropTypes.string.isRequired,
    likeReview: PropTypes.func.isRequired,
    unlikeReview: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeReview,
    unlikeReview
}


export default connect(mapStateToProps,mapActionsToProps)(LikeButton)
