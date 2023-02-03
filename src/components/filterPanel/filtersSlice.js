import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeFilter: 'all',
    term: ''
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilter: (state, action) => {state.activeFilter = action.payload},
        changeTerm: (state, action) => {state.term = action.payload}
    }
})

const {actions, reducer} = filtersSlice

export default reducer
export const {changeFilter, changeTerm} = actions