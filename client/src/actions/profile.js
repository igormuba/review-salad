import axios from 'axios';
import {setAlert} from './alert';

import {GET_PROFILE,PROFILE_ERROR, POST_PROFILE} from './types';

export const getCurentProfile = () => async dispatch=>{
    try{
        const res = await axios.get('/api/profile/me');
        dispatch({type: GET_PROFILE, payload: res.data});
    }catch(err){
        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status} });
    }
}

export const updateProfile = (bio, youtube, twitter, facebook, instagram, discord) => async dispatch=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({bio, youtube, twitter, facebook, instagram, discord});
    try{
       
        const res = await axios.post('/api/profile/', body, config);
        dispatch({type: POST_PROFILE, payload: res.data});
        dispatch(getCurentProfile());
    }catch(err){
        console.log(err);
        dispatch({type: PROFILE_ERROR, payload: {msg: err.response.statusText, status: err.response.status} });
    }
    
}