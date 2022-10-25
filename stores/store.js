import { applyMiddleware, createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const configPersist = persistReducer(persistConfig, rootReducer);

export const Store = createStore(configPersist, applyMiddleware(thunk, logger));
export const Persistor = persistStore(Store);