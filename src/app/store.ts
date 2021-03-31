import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "../reducers/authReducer";
import alunosReducer from "../reducers/alunosReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        alunos: alunosReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
