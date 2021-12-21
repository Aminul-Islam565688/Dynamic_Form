import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import authReducer from "./reducers/authReducers";
import formFiledReducers from "./reducers/formFiledsReducers";


const reducers = combineReducers({ auth: authReducer, formFields: formFiledReducers }, applyMiddleware(logger))


const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;