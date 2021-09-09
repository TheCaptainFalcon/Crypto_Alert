import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (data, history) => dispatch => {
    axios.post('http://localhost:5000/user/register', data)
        .then(res => history.push('/user/login'))
        .catch(err => {
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
            });
        });
};

export const setCurrentUser = decoded => {
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    };
};

export const loginUser = (data) => dispatch => {
    axios.post('http://localhost:5000/user/login', data)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
            });
        });
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};