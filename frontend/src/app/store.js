import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import bookReducer from '../features/slices/bookSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        books: bookReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
