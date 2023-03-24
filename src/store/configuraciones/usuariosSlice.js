import { createSlice } from "@reduxjs/toolkit";

export const usuariosDataSlice = createSlice({
    name: 'usuariosData',
    initialState: {
        isLoading: false,
        status: 'sin-data',
        data: [],
        errorMessage: null,
        initialFormFields: {
            nombre: '',
            user: '',
            pass: '',
            passConfirm: '',
            status: true
        },
        userID: null,
        isEdit: false
        
    },
    reducers: {
        onloading: (state, { payload }) => {
            state.isLoading = payload
        },
        onLoadingUsuarios: (state, { payload = [] }) => {

            payload.forEach(dd => {
                const exist = state.data.some(dbdata =>
                    dbdata.user_id === dd.user_id
                );
                if (!exist) {
                    state.data.push(dd)
                }
            });
            state.status = 'data-cargada'
            state.isLoading = false
        },
        onReload: (state) => {
            state.status = 'sin-data'
        },
        onError: (state, { payload }) => {
            state.errorMessage = payload
        },
        onLoaded: (state) => {
            state.isLoading = false
        },
        setFormFields: (state, { payload }) => {
            state.initialFormFields = payload
        },
        resetFormFields: (state) => {
            state.initialFormFields =
            {
                nombre: '',
                user: '',
                pass: '',
                passConfirm: '',
                status: true
            }
        },
        setUserID: (state, { payload }) => {
            state.userID = payload
        },
        onEdit: (state, { payload }) =>{
            state.isEdit = payload
        },
        onResetData: (state) =>{
            state.data = []
        }
    }
});

export const {
    onloading,
    onLoadingUsuarios,
    onError,
    onLoaded,
    setFormFields,
    onReload,
    setUserID,
    resetFormFields,
    onEdit,
    onResetData,
} = usuariosDataSlice.actions;
