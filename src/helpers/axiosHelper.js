import axios from 'axios';
const rootAPI = import.meta.env.VITE_APP_ROOTAPI;
const userEp = rootAPI + '/users';
const transEp = rootAPI + '/transactions';


const getUserId = () => {
    const userStr = localStorage.getItem('user');
    const userObj = userStr ? JSON.parse(userStr) : null
    return userObj?._id ?? null
}


/******************* USER API ***************************/
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
        const { data } = await axios.post(userEp + '/login', userObj);
        return data;
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            message: error.message,
        }
    }
}

/******************* Transaction API ***************************/

export const postNewTransaction = async (transObj) => {
    try {
        const userId = getUserId();
        if (!userId) {
            new Error("User id dosent exist. Please login again")
        }
        const { data } = await axios.post(transEp, transObj, {
            headers: {
                Authorization: userId,
            }
        });
        return data;
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            message: error.message,
        }
    }
}

/********************************************** 
export const getTransactions = async (filter) => {
    try {
        const userId = getUserId();
        if (!userId) {
            new Error("User id dosent exist. Please login again")
        }
        const { data } = await axios.get(transEp, {
            headers: {
                Authorization: userId,
            }
        });
        // console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            message: error.message,
        }
    }
}
*************************************************/

export const getTransactions = async (filter) => {
    try {
        const userId = getUserId();
        if (!userId) {
            throw new Error("User id doesn't exist. Please log in again");
        }

        const headers = {
            Authorization: userId,
        };

        if (filter && filter.fromDate && filter.toDate) {
            headers['fromDate'] = filter.fromDate;
            headers['toDate'] = filter.toDate;
        }

        const { data } = await axios.get(transEp, { headers });
        return data;
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: error.message,
        };
    }
};

export const deleteTransactions = async (idsToDelete) => {
    try {
        const userId = getUserId();

        if (!userId) {
            throw new Error("User id doesn't exist! Login and try again");
        }
        const { data } = await axios.delete(transEp, {
            data: idsToDelete,
            headers: {
                Authorization: userId,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: error.message,
        };
    }
}