import axios from "axios";

export const SHARED_FORM_DATA = 'SHARED_FROM_DATA';


const getSharedFromDataRequest = (data) => {
    return {
        type: SHARED_FORM_DATA,
        payload: data
    }
}


export const getSharedFromData = (id) => dispatch => {
    axios.get(`http://localhost:7000/form/${id}`)
        .then(res => {
            dispatch(getSharedFromDataRequest(res.data));
            console.log(res.data)
        })
        .catch(err => console.log(err.message))
}