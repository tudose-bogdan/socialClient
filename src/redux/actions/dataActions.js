import {SET_REVIEWS,SET_REVIEW, LOADING_DATA, LIKE_REVIEW, UNLIKE_REVIEW,DELETE_REVIEW, CLEAR_ERRORS, SET_ERRORS, POST_REVIEW, LOADING_UI,STOP_LOADING_UI} from '../types'
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

export const getReview = (criticId) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.get(`/critic/${criticId}`)
        .then(res => {
            dispatch({
                type: SET_REVIEW,
                payload: res.data
            });
        dispatch({type: STOP_LOADING_UI });
        })
        .catch(err => console.log(err));
}

//Post a review
export const postReview = (newReview) => (dispatch) => {
    dispatch({type: LOADING_UI});

    axios.post('/postReview', newReview)
        .then(res => {
            dispatch({
                type: POST_REVIEW,
                payload: res.data
            });
            dispatch({
                type:CLEAR_ERRORS
            });

        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

//Like a review
export const likeReview = (reviewId) => (dispatch) => {
    axios.get(`/critic/${reviewId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_REVIEW,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}


//Unlike a review
export const unlikeReview = (reviewId) => (dispatch) => {
    axios.get(`/critic/${reviewId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_REVIEW,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const deleteReview = (criticId) => (dispatch) => {
    axios.delete(`/critic/${criticId}`)
        .then(() => {
            dispatch({type:DELETE_REVIEW, payload: criticId})
        })
        .catch(err => console.log(err));
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

