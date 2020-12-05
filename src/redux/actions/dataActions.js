import {SET_EVENTS, LOADING_DATA, CREATE_EVENT, SET_ERRORS, LOADING_UI, CLEAR_ERRORS} from '../types'
import axios from 'axios'

export const getEvents = () => (dispatch) =>
{
    dispatch({type: LOADING_DATA});

    axios.get('/events')
    .then(res => 
    {
        dispatch({
            type: SET_EVENTS, 
            payload: res.data
        })
    })
    .catch(err => 
    {
        dispatch({
            type: SET_EVENTS, 
            payload: []
        })
    })
}

export const createEvent = (eventData, history) => (dispatch) =>
{
    dispatch({type: LOADING_UI});

    axios.post('/events', eventData,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res =>
    {
        console.log(res); 
        dispatch({type: CLEAR_ERRORS})
        history.push('/events')
    })
    .catch(err =>
    {
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    })
}