import {SET_REVIEWS, LOADING_DATA, LIKE_REVIEW, UNLIKE_REVIEW} from '../types'
import axios from 'axios'


//Get all reviews
export const getReviews = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get('/reviews')
        .then(res => {
            dispatch({
                type:SET_REVIEWS,
                payload:res.data
            })
        })
        .catch(err => {
            dispatch({
                type:SET_REVIEWS,
                payload:[]
            })
        })
}

//Like a review
export const likeReview = (criticId) => (dispatch) => {
    axios.get(`/critic/${criticId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_REVIEW,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}


//Unlike a review
export const unlikeReview = (criticId) => (dispatch) => {
    axios.get(`/critic/${criticId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_REVIEW,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}