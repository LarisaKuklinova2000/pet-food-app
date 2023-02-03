import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import filters from '../components/filterPanel/filtersSlice'
import regInfo from '../components/signUp/signSlice'

const store = configureStore({
    reducer: {filters, regInfo, [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;