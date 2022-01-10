import { combineReducers, configureStore } from '@reduxjs/toolkit';
// импорты слайсов
/**
 * Комбинированный основной редусер из нескольких редусеров*/
const rootReducer = combineReducers({
    // ScreenSlice: ScreenSlice,
})
/**
 * Основной магазин приложения с комбинированным редусером*/
export const store = configureStore({
    reducer: rootReducer,
})