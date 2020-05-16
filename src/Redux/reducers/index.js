import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import hopeReducer from "./hopeReducers" 

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    hope: hopeReducer
});