import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import  reduxTthunk  from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
 
import rootReducer from './index';
 
const persistConfig = {
  key: 'root',
  blacklist: ['displayedSearchResults', 'currentQuery', 'currentSearchType'],
  storage,
};

 
const persistedReducer = persistReducer(persistConfig, rootReducer);

 
export default () => {
    let store = createStore(persistedReducer, applyMiddleware(reduxTthunk));
    let persistor = persistStore(store);
    return { store, persistor };
};