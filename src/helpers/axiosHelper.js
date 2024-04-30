import axios from 'axios';
const rootAPI = import.meta.env.VITE_APP_ROOTAPI;
const userEp = rootAPI + '/users';

export const postNewUser = async (userObj) => {
    try {
        const { data } = await axios.post(userEp, userObj);
        return data;
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            message: error.message,
        }
    }
}

export const loginUser = async (userObj) => {
    try {
        const { data } = await axios.post(userEp+'/login', userObj);
        return data;
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            message: error.message,
        }
    }
}