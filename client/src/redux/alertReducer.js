import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    mode: "",
    msg: "",
    show: false
}

export const alertReducer = createReducer(initialState, {
    showAlert: (state, payload) =>{
        state.mode = payload.mode
        state.msg = payload.msg
        state.show = true
    },
    hideAlert: (state) =>{
        state.mode = ""
        state.msg = ""
        state.show = false
    }

})