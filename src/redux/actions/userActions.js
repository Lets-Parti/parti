import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) =>
{
    dispatch({type: LOADING_UI});

    axios.post('/login', JSON.stringify(userData), 
    {            
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => 
    {
        setAuthorizationHeader(res.data.token); 
        dispatch(getUserData()); 
        dispatch({type: CLEAR_ERRORS});
        history.push('/discover')
    })
    .catch(err => 
    {
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    })
}

export const signupUser = (newUserData, history) => (dispatch) =>
{
    dispatch({type: LOADING_UI});

    axios.post('/signup', JSON.stringify(newUserData), 
    {            
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => 
    {
        setAuthorizationHeader(res.data.token); 
        dispatch(getUserData()); 
        dispatch({type: CLEAR_ERRORS});
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

export const getUserData = () => (dispatch) =>
{
    axios.get('/user')
    .then(res =>
    {
        dispatch({
            type: SET_USER, 
            payload: res.data
        })
    })
    .catch(err => 
    {
        console.error(err)
    })
}

export const logoutUser = () => (dispatch) =>
{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
    window.location.href = "/"                                                      
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}