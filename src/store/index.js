import {configureStore, combineReducers } from '@reduxjs/toolkit'
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { apiSlice } from '../api/apiSlice'
import filters from '../components/filterPanel/filtersSlice'
import regInfo from '../components/signUp/signSlice'
import basket from '../components/basket/basketSlice'
import favorite from '../components/favorite/favoriteSlice'

const rootReducer = combineReducers({
    filters, 
    regInfo, 
    basket,
    favorite,
    [apiSlice.reducerPath]: apiSlice.reducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['basket', 'favorite', 'filters']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export let persistor = persistStore(store)

export default store;