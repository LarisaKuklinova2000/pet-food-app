import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    favoriteItems: []
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addProductToFavorite: (state, action) => {
            state.favoriteItems.push(action.payload)
        },
        deleteProductFromFavorite: (state, action) => {
            state.favoriteItems = state.favoriteItems.filter(item => item !== action.payload)
        }
    }
})

const {actions, reducer} = favoriteSlice

export default reducer
export const {addProductToFavorite, deleteProductFromFavorite} = actions