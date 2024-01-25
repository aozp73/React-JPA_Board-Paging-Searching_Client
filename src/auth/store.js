import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './authReducer';

// combineReducers: 여러 리듀서를 하나의 루트 리듀서(rootReducer)로 결합 가능
const rootReducer = combineReducers({
    auth: authReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // 어떤 리듀서 상태를 영속화할지 지정
};

// persistReducer: Redux 상태의 영속성 관리
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
