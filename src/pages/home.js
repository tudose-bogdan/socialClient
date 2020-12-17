import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Review from '../components/Review'
class home extends Component {
    state = {
        critics: null
    }

    componentDidMount(){
        axios.get('/reviews')
            .then(res => {
                console.log(res.data)
                this.setState({
                    critics:res.data
                })
            })
            .catch(err => console.log(err))

    }


    render() {
        let recentReviewsMarkup = this.state.critics ? (
            this.state.critics.map((review) => <Review review={review}/> )
        ) : <p>Loading...</p>
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentReviewsMarkup}
                </Grid>

                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>

                </Grid>
            </Grid>
        )
    }
}

export default home
