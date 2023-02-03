import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: '',
    myInfo: ''
}

const signSlice = createSlice({
    name: 'regInfo',
    initialState,
    reducers: {
        changeToken: (state, action) => {
            state.token = action.payload
        },
        changeMyInfo: (state, action) => {
            state.myInfo = action.payload
        }
    }
})

const {actions, reducer} = signSlice

export default reducer
export const {changeToken, changeMyInfo} = actions