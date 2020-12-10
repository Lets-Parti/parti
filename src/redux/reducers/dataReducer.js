<<<<<<< HEAD
import {SET_EVENTS, LOADING_DATA, CREATE_EVENT, DISCOVER, SET_USER_DATA} from '../types'
=======
import {SET_EVENTS, LOADING_DATA, CREATE_EVENT, DISCOVER, CREATE_FEEDBACK} from '../types'
>>>>>>> dfc63976e8d796c84785dbdbe2bfeda2c3009433

const initialState = {
    events: [], 
    discover: [],
    user: null, 
    isLoading: false
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case LOADING_DATA: 
            return {
                ...state, 
                isLoading: true
            }
        case SET_EVENTS: 
            return {
                ...state, 
                events: action.payload,
                isLoading: false
            }
        case CREATE_EVENT: 
            return {
                ...state, 
                isLoading: false
            }
        case CREATE_FEEDBACK: 
            return {
                ...state, 
                isLoading: false
            }
        case DISCOVER: 
            return {
                ...state, 
                discover: action.payload, 
                isLoading: false
            }
        case SET_USER_DATA: 
            return {
                ...state, 
                user: action.payload, 
                isLoading: false
            }
        default: 
            return state
    }
}