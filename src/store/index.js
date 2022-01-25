import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from './reducers/LoginSlice'
import AnamnezSlice from './reducers/AnamnezSlice';

/**
 * Комбинированный основной редусер из нескольких редусеров*/
const rootReducer = combineReducers({
    LoginSlice: LoginSlice,
    AnamnezSlice: AnamnezSlice
})
/**
 * Основной магазин приложения с комбинированным редусером*/
export const store = configureStore({
    reducer: rootReducer,
})