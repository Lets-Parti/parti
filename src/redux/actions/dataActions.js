import {SET_EVENTS, LOADING_DATA, CREATE_EVENT, SET_ERRORS, LOADING_UI, CLEAR_ERRORS, DISCOVER, SET_USER_DATA, DISCOVER_EVENTS} from '../types'
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

export const getEventsForDiscover = () => (dispatch) =>                        
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

// export const getEventss = () => (dispatch) =>                        
// {
//     dispatch({type: LOADING_DATA});

//     axios.get('/events')
//     .then(res => 
//     {
//         dispatch({
//             type: SET_EVENTS, 
//             payload: res.data
//         })
//     })
//     .catch(err => 
//     {
//         dispatch({
//             type: SET_EVENTS, 
//             payload: []
//         })
//     })
// }

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

export const createFeedback = (feedbackData, history) => (dispatch) =>
{
    dispatch({type: LOADING_UI});

    axios.post('/feedback', feedbackData,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res =>
    {
        console.log(res); 
        dispatch({type: CLEAR_ERRORS})
        history.push('/')
    })
    .catch(err =>
    {
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    })
}

export const discover = (queryData) => (dispatch) =>
{
    dispatch({type: LOADING_DATA});

    axios.get('/discover', {
        headers: {
            'service': queryData.service
        }
    })
    .then(res =>
        {
            console.log(res); 
            dispatch({
                type: DISCOVER, 
                payload: res.data
            })
        })
    .catch(err =>
    {
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    })
}

export const discoverEventsActions = (queryData) => (dispatch) =>
{
    dispatch({type: LOADING_DATA});

    axios.get('/discover-events', {
        headers: {
           'service': queryData.service
        }
    })
    .then(res =>
        {
            console.log(res); 
            dispatch({
                type: DISCOVER_EVENTS, 
                payload: res.data
            })
        })
    .catch(err =>
    {
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    })
}

export const getUserByHandle = (userHandle) => (dispatch) =>
{
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`)
    .then(res =>
    {
        if(res.data.user)
        {
            dispatch({
                type: SET_USER_DATA, 
                payload: res.data.user
            })
        }
    })
    .catch(() =>
    {
        dispatch({
            type: SET_USER_DATA, 
            payload: null
        })
    })
}