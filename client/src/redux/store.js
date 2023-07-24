import {configureStore} from "@reduxjs/toolkit"
import { alertReducer } from "./alertReducer";


const store = configureStore({
    reducer:{
        alertReducer: alertReducer,
    }
})

export default store;