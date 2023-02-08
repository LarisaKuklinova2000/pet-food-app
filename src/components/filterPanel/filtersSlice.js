import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeFilter: 'all',
    term: '',
    showModal: false
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilter: (state, action) => {state.activeFilter = action.payload},
        changeTerm: (state, action) => {state.term = action.payload},
        setShowModal: (state) => {state.showModal = !state.showModal}
    }
})

const {actions, reducer} = filtersSlice

export default reducer
export const {changeFilter, changeTerm, setShowModal} = actions