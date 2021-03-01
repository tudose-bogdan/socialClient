import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import DeleteReview from './DeleteReview'
import ReviewDialog from './ReviewDialog'
import LikeButton from './LikeButton'
//Mui
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography  from '@material-ui/core/Typography'
//Icons
import ChatIcon from '@material-ui/icons/Chat'
import ContactMailIcon from '@material-ui/icons/ContactMail';


//Redux
import {connect} from 'react-redux'

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
    },
    plusOne: {
        position: 'absolute',
        left: '90%',
        top: '5%'
        
    },

}

class Review extends Component {
    
    handlePlusOne = () => {

        alert('Sent!')
    }

    render() {
        dayjs.extend(relativeTime)
        const {classes, review: {body, createdAt, userImage, userHandle, criticId, likeCount, commentCount},user:{authenticated, credentials: {handle}}} = this.props
       
        const deleteButton = authenticated && userHandle === handle ? (
                <DeleteReview criticId={criticId}/>
                
                
        ) : null
            
        const plusOneButton = authenticated && userHandle !== handle ? (
            <MyButton onClick={this.handlePlusOne} tip="Contact user" btnClassName="button" tipClassName={classes.plusOne}>
            <ContactMailIcon color="primary"/>
   
         </MyButton>
            
            
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
                <LikeButton criticId={criticId}/>
                <span>{likeCount} Likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span>{commentCount} Comments</span>
                <ReviewDialog criticId={criticId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                {plusOneButton}

                
            </CardContent>
        </Card>
        )
    }
}

Review.propTypes = {
    
    user: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Review));
