// import { compose, createStore, applyMiddleware } from "redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  taskReducer  from "./task";
import {logger} from "./midlleware/logger"
import errorReducer from "./errors";
// import { thunk } from "./midlleware/thunk";
// import { getDefaultNormalizer } from "@testing-library/react";

// const middlewareEnhancer = applyMiddleware(logger, thunk)
const rootReducer=combineReducers({
    errors:errorReducer,
    tasks:taskReducer
})
function createStore() {
    return configureStore({
        reducer: rootReducer, 
        middleware: (getDefaultMiddleware)=>
          getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production"
    })
}
export default createStore