import {SET_EVENTS, LOADING_DATA, CREATE_EVENT, DISCOVER, CREATE_FEEDBACK} from '../types'

const initialState = {
    events: [], 
    discover: [],
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
        default: 
            return state
    }
}