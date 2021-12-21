import { USER_LOGIN } from "../actions/authActions";

const initialState = {
    isSignedIn: false,
    accessToken: "",
    refreshToken: "",
    name: "",
    email: "",
    photo: "",
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOGIN:
            localStorage.setItem('user', JSON.stringify(payload))
            return {
                ...state,
                isSignedIn: payload.isSignedIn,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
                name: payload.name,
                email: payload.email,
                photo: payload.photo,
            }
        default: return state;
    }
}

export default authReducer;