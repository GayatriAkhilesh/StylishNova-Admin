import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {stylishNovaReducer} from './reducer';

//redux persist config
const persistConfig = {
  key: 'StylishNovaAdmin',
  storage: AsyncStorage,
};

//Middleware: Redux persist persisted reducer
const persistedReducer = persistReducer(persistConfig, stylishNovaReducer);

//redux: store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

//Middleware: Redux persist persister
let persister = persistStore(store);

//export
export {store, persister};
