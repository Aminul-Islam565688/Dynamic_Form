import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducers";
import formFiledReducers from "./reducers/formFiledsReducers";


const rootReducers = combineReducers({ auth: authReducer, formFields: formFiledReducers })


const store = createStore(rootReducers, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;