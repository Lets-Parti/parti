import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, EDIT_ACCOUNT} from '../types'
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

export const updateUserProfile = (userData, userType) => (dispatch) =>
{
    dispatch({type: LOADING_UI});
    let dataSentToDB = {}
    if(userType === 'client')
    {
        dataSentToDB = {
            zipcode: userData.zipcode, 
            fullName: userData.fullName,
            phone: userData.phone
        }
        
        axios.post('/account/edit', JSON.stringify(dataSentToDB),
        {            
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res =>
        {
            dispatch({type: CLEAR_ERRORS});
            window.location.href = "/account/edit"
        })
        .catch(err => 
        {
            dispatch({
                type: SET_ERRORS, 
                payload: err.response.data
            })
        })

    }else if(userType === 'service')
    {
        let website = userData.website ? userData.website : ''; 
        let instagram = userData.instagram ? userData.instagram : ''; 
        let facebook = userData.facebook ? userData.facebook : ''; 

        dataSentToDB = {
            phone: userData.phone,
            zipcode: userData.zipcode, 
            fullName: userData.fullName, 
            tags: userData.tags, 
            bio: userData.bio, 
            website, 
            instagram, 
            facebook
        }

        axios.post('/account/edit', JSON.stringify(dataSentToDB),
        {            
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res =>
        {
            dispatch({type: CLEAR_ERRORS});
            window.location.href = "/account/edit"
        })
        .catch(err => 
        {
            dispatch({
                type: SET_ERRORS, 
                payload: err.response.data
            })
        })
    }
}

export const uploadProfileImage = (formData) => (dispatch) =>
{
    dispatch({type: LOADING_UI})
    axios.post('/user/image', formData)
    .then(res => {
        dispatch(getUserData()); 
        dispatch({type: CLEAR_ERRORS});
        window.location.href = "/account/edit";
    })
    .catch(err =>
    {
        alert(`Something went wrong: ${err}`);
    })
}

export const uploadMediaImage = (formData) => (dispatch) =>
{
    dispatch({type: LOADING_UI})
    axios.post('/user/services/media', formData)
    .then(res =>{
        dispatch(getUserData()); 
        dispatch({type: CLEAR_ERRORS});
        window.location.href = "/account/edit";
    })
    .catch(err =>
    {
        alert(`Something went wrong: ${err}`);
    })
}

export const deleteMediaImage = (indexValue) => (dispatch) =>
{
    dispatch({type: LOADING_UI})
    let axiosData = {
        index: indexValue
    }
    axios.post('/user/services/media/delete', JSON.stringify(axiosData), 
    {            
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res =>
    {
        dispatch(getUserData()); 
        dispatch({type: CLEAR_ERRORS})
    })
    .catch(err =>
    {
        console.error(err); 
    })
}

 
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}