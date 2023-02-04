import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    basketItems: []
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addProductToBasket: (state, action) => {
            state.basketItems.push(action.payload)
        },
        deleteProductFromBasket: (state, action) => {
            state.basketItems = state.basketItems.filter(item => item.id !== action.payload.id)
        },
        incAmount: (state, action) => {
            state.basketItems.map(item => item.id === action.payload && item.amount < item.stock? item.amount++: null)
        },
        decAmount: (state, action) => {
            state.basketItems.map(item => item.id === action.payload && item.amount > 1? item.amount--: null)
        }
    }
})

const {actions, reducer} = basketSlice

export default reducer
export const {addProductToBasket, deleteProductFromBasket, incAmount, decAmount} = actions