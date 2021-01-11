import {SET_REVIEWS, LIKE_REVIEW, UNLIKE_REVIEW, LOADING_DATA} from '../types';

const initialState = { 
    reviews: [],
    review: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
                loading: false
            }
        case LIKE_REVIEW:
        case UNLIKE_REVIEW:
            let index = state.reviews.findIndex((review) => review.criticId === action.payload.criticId)
            state.reviews[index] = action.payload;
            return {
                ...state
            };
        default:
            return state;

    }
}