import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
   combineReducers,
   configureStore,
   createSlice,
   createStore,
   PayloadAction,
} from "@reduxjs/toolkit";
import {
   Provider,
   TypedUseSelectorHook,
   useDispatch,
   useSelector as useReduxSelector,
} from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

interface LoginForm {}

interface FormData {
   email: string;
   name: string;
   currentPassword: string;
   newPassword: string;
   country: string;
   phoneNumber: string;

   loginEmail: string;
   loginPassword: string;
}
export type InputName = keyof FormData;
const initialFormData: FormData = {
   email: "",
   name: "",
   currentPassword: "",
   newPassword: "",
   country: "",
   phoneNumber: "",
   loginEmail: "",
   loginPassword: "",
};
const formSlice = createSlice({
   name: "formData",
   initialState: initialFormData,
   reducers: {
      setFields: (state, action: PayloadAction<Partial<FormData>>) => {
         return {
            ...state,
            ...action.payload,
         };
      },
   },
});

interface UserData {
   name: string;
   email: string;
   country: string;
   password: string;
   phoneNumber: string;
   loggedIn: boolean;
}

const initialUserData: UserData = {
   name: "John Doe",
   email: "tes123@gmail.com",
   country: "Thailand",
   password: "test123",
   phoneNumber: "",
   loggedIn: localStorage.getItem("loggedIn") ? true : false,
};

type RootState = ReturnType<typeof rootReducer>;

const userDataSlice = createSlice({
   name: "userData",
   initialState: initialUserData,
   reducers: {
      logout: (state) => {
         state.loggedIn = false;
      },
      login: (state) => {
         state.loggedIn = true;
      },
      updateUserData: (state, action: PayloadAction<Partial<UserData>>) => {
         type UserField = keyof UserData;
         return { ...state, ...action.payload };
      },
   },
});
export const userActions = userDataSlice.actions;
export const formActions = formSlice.actions;
const rootReducer = combineReducers({
   formData: formSlice.reducer,
   userData: userDataSlice.reducer,
});

interface IState {
   formData: FormData;
   userData: UserData;
}

const store = createStore(rootReducer);
export const useSelector: TypedUseSelectorHook<IState> = useReduxSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
