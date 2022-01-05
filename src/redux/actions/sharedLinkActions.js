import axios from "axios";

export const SHARED_FORM_DATA = 'SHARED_FROM_DATA';


const getSharedFromDataRequest = (data) => {
    return {
        type: SHARED_FORM_DATA,
        payload: data
    }
}


export const getSharedFromData = (id) => dispatch => {
    axios.get(`${process.env.REACT_APP_SERVER_LINK}/form/${id}`)
        .then(res => {
            dispatch(getSharedFromDataRequest(res.data));
            console.log(res.data)
        })
        .catch(err => console.log(err.message))
}