'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartSlice from '../slices/cartSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { menuApi } from '@/apiRtk/apis/menuApi';

const persistConfig = {
    timeout: 250,
    key: "root",
    storage,
    whitelist: ["cart"]
};

const rootReducers = combineReducers({
    cart: cartSlice,
    [menuApi.reducerPath]: menuApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer:
        persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(menuApi.middleware), thunk
})
