import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Review from '../components/review/Review'
import Profile from '../components/profile/Profile'

import {connect} from 'react-redux'

import {getReviews} from '../redux/actions/dataActions'


class home extends Component {
  

    componentDidMount(){
        this.props.getReviews();
        

    }


    render() {
        const {reviews, loading} = this.props.data;

        let recentReviewsMarkup = !loading ? (
            reviews.map((review) => <Review key={review.criticId} review={review}/> )
        ) : <p>Loading...</p>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentReviewsMarkup}
                </Grid>

                <Grid item sm={4} xs={12}>
                    <Profile />

                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getReviews: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired

}


const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps,{getReviews})(home);
