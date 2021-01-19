import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Review from '../components/review/Review'
import StaticProfile from '../components/profile/StaticProfile'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import {getUserData} from '../redux/actions/dataActions'

class user extends Component {
    state = {
        profile: null,
        criticIdParam: null
    }

    componentDidMount(){
        const handle = this.props.match.params.handle;
        const criticId = this.props.match.params.criticId;

        if(criticId){
            this.setState({criticIdParam: criticId});

        }

        this.props.getUserData(handle);

        axios.get(`/user/${handle}`)
            .then( res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const {reviews, loading} = this.props.data; 
        const {criticIdParam} = this.state;


        const reviewsMarkup = loading ? (
            <p> Loading... </p>
        ) : reviews === null ? (
            <p> No reviews yet</p>
        ) : !criticIdParam ? (
            reviews.map(review => <Review key={review.criticId} review={review}/>)
        ) : (
            reviews.map(review => {
                if(review.criticId !== criticIdParam)
                    return <Review key={review.criticId} review={review}/>
                else return  <Review key={review.criticId} review={review} openDialog/>
            })
        )
        return (
            <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {reviewsMarkup}
            </Grid>

            <Grid item sm={4} xs={12}>
                {this.state.profile === null ? (
                    <p>Loading profile... </p>
                ): (
                <StaticProfile profile={this.state.profile} />

                )}
            </Grid>
        </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getUserData }
  )(user);
