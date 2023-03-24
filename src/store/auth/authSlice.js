import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
         status: 'checking',
        //status: 'not-authenticated',
        //status: 'authenticated',
        nombre: null,
        user: null,
        errorMessage: null
    },
    reducers: {
        login: (state, { payload }) =>{
            state.status = 'authenticated',
            state.nombre = payload.nombre,
            state.user = payload.user,
            state.errorMessage = null
            //localStorage.setItem('auth', JSON.stringify({nombre: state.nombre, user: state.user}))
            
        },
        logout: (state, { payload }) =>{
            state.status = 'not-authenticated',
            state.nombre = null,
            state.user = null,
            state.errorMessage = null
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
        onSetError: (state, { payload }) =>{
            state.errorMessage = payload.msg
        },
        onSetAuthStorage: (state, { payload }) =>{
            localStorage.setItem('loading', JSON.stringify({status: state.status, nombre: payload.nombre, user: payload.user}))
   
        }

    }
});

export const {
    login,
    logout,
    checkingCredentials,
    onSetError,
    onSetAuthStorage
    
} = authSlice.actions;


