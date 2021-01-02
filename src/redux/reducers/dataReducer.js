import {SET_EVENTS, LOADING_DATA, CREATE_EVENT, DISCOVER, CREATE_FEEDBACK, SET_USER_DATA, DISCOVER_EVENTS, SET_CONTRACTS, SET_CONNECTS} from '../types'

const initialState = {
    events: [], 
    contracts: [], 
    discover: [],
    connects: [],
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
        case DISCOVER_EVENTS: 
            return {
                ...state, 
                discoverEvents: action.payload, 
                isLoading: false
            }
        case SET_USER_DATA: 
            return {
                ...state, 
                user: action.payload, 
                isLoading: false
            }
        case SET_CONTRACTS:
            return {
                ...state, 
                contracts: action.payload,
                isLoading: false
            }
        case SET_CONNECTS:
            return {
                ...state, 
                connects: action.payload,
                isLoading: false
            }
        default: 
            return state
    }
}