import { createSlice } from "@reduxjs/toolkit";


export const useProductsSlice = createSlice({
    name: 'product',
    initialState: {
        showForm: false,
        initialFormFields: {
            cantidad: '',
            precio: '',
            detalle: '',
            saveAsProduct: false
        }
    },
    reducers:{
        onShowForm: (state, { payload }) =>{
            state.showForm = !state.showForm
        },
        onSetFormFiens: (state, { payload }) => {
            state.initialFormFields = payload
        },
    }
});

export const { 
    onShowForm,
    onSetFormFiens,
} = useProductsSlice.actions;