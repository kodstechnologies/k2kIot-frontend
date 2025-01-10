import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import themeConfigSlice from './themeConfigSlice';
import authReducer from './auth/AuthSlice'; // Import the auth reducer

// Configuration for redux-persist
const persistConfig = {
    key: 'root', // Key for localStorage
    storage, // LocalStorage as storage engine
    whitelist: ['auth'], // Persist only the 'auth' state (add others if needed)
};

// Combine reducers
const rootReducer = combineReducers({
    themeConfig: themeConfigSlice, // This won't be persisted
    auth: authReducer, // Persisted
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions for serializable check
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Persistor for syncing with storage
export const persistor = persistStore(store);

export default store;

// Type for Root State
export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;