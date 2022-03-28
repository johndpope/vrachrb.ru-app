import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from './reducers/LoginSlice'
import AnamnezSlice from './reducers/AnamnezSlice';
import SpecSlice from "./reducers/SpecSlice";
import EstimateSlice from './reducers/EstimateSlice';
import UtilitySlice from './reducers/UtilitySlice';

/**
 * Комбинированный основной редусер из нескольких редусеров*/
const rootReducer = combineReducers({
    LoginSlice: LoginSlice,
    AnamnezSlice: AnamnezSlice,
    SpecSlice: SpecSlice,
    EstimateSlice: EstimateSlice,
    UtilitySlice: UtilitySlice
})
/**
 * Основной магазин приложения с комбинированным редусером*/
export const store = configureStore({
    reducer: rootReducer,
})