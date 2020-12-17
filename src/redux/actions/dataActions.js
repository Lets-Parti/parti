import {SET_EVENTS, LOADING_DATA, SET_ERRORS, LOADING_UI, CLEAR_ERRORS, DISCOVER, SET_USER_DATA, SET_CONTRACTS} from '../types'
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

export const deleteContract = (contractID) => (dispatch) =>
{
    dispatch({type: LOADING_UI})
    let dataSentToDB = {
        contractID
    }
    axios.post('/contracts/delete', dataSentToDB,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res =>
    {
        dispatch({type: CLEAR_ERRORS})
        window.location.href = "/contracts"     
    })
    .catch(err =>
    {
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    })
}

export const signContract = (contractID) => (dispatch) =>
{
    dispatch({type: LOADING_UI})
    let dataSentToDB = {
        contractID
    }
    axios.post('/contracts/sign', dataSentToDB,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res =>
    {
        dispatch({type: CLEAR_ERRORS})
        window.location.href = "/contracts"     
    })
    .catch(err =>
    {
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    })
}

export const getContracts = () => (dispatch) =>                        
{
    dispatch({type: LOADING_DATA});

    axios.get('/contracts')
    .then(res => 
    {
        dispatch({
            type: SET_CONTRACTS, 
            payload: res.data
        })
    })
    .catch(err => 
    {
        dispatch({
            type: SET_CONTRACTS, 
            payload: []
        })
    })
}

export const createContract = (contractData, history) => (dispatch) =>
{
    dispatch({type: LOADING_UI});
    axios.post('/contracts', contractData,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res =>
    {
        console.log(res); 
        dispatch({type: CLEAR_ERRORS})
        history.push('/contracts')
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
console.log(queryData.serviceTags)
    axios.get('/discover', {
        headers: {
            'service': queryData.serviceTags
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

export const discoverEvents = () => (dispatch) =>                        
{
    dispatch({type: LOADING_DATA});

    axios.get('/discover/events')
    .then(res => 
    {
        dispatch({
            type: DISCOVER, 
            payload: res.data
        })
    })
    .catch(err => 
    {
        dispatch({
            type: SET_ERRORS, 
            payload: []
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