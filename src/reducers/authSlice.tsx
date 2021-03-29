import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import "firebase/auth";

import { Login } from "../components/login/LoginForm";

interface AuthState {
  isLogged: boolean;
  user: any | undefined;
}
const initialState: AuthState = {
  isLogged: localStorage.getItem("isLogged") ? true : false,
  user: undefined,
};

export const login = createAsyncThunk("auth/login", async (user: Login) => {
  let result: any;
  await firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      console.log(data);
      result = data.user!.email;
    })
    .catch((error) => {
      return Promise.reject("Credenciais incorretas");
    });

  return result;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /*
        incrementByAmount: (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        }*/
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogged = true;
      state.user = action.payload;
      localStorage.setItem("isLogged", "true");
      //Tem que ver o precisa na request para salvar o necessario do objeto
    });

    builder.addCase(login.rejected, (state, action) => {
      localStorage.removeItem("isLogged");
      state.isLogged = false;
      state.user = undefined;
    });
  },
});

export default authSlice.reducer;
