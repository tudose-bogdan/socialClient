import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Review from '../components/Review'
import Profile from '../components/Profile'
class home extends Component {
    state = {
        critics: []
    }

    componentDidMount(){
        axios.get('/reviews')
            .then(res => {
                this.setState({
                    critics:res.data
                })
            })
            .catch(err => console.log(err))

    }


    render() {
        let recentReviewsMarkup = this.state.critics ? (
            this.state.critics.map((review) => <Review key={review.criticId} review={review}/> )
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

export default home
