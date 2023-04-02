import { createSlice } from '@reduxjs/toolkit'

export const useEmpresaSlice = createSlice({
    name: 'empresa',
    initialState: {
        isLoading: false,
        data: [],
        initialFormFields: {
            representante: '',
            taller_nom: '',
            pais: '',
            estado: '',
            municipio: '',
            cp: '',
            domicilio: ''
        },
        taller_nom: ''
    },
    reducers: {
        onloading: (state, { payload }) => {
            state.isLoading = true
        },
        // onLoadingDataEnterprice: (state, { payload }) => {
        //     payload.forEach(emp => {
        //         state.taller_nom = emp.taller_nom
        //             state.data.push(emp);
        //     });
        //     state.isLoading = false
        // },
        setFormFields: (state, { payload }) => {
            state.initialFormFields = payload
            state.taller_nom = payload.taller_nom 
            state.isLoading = false
        },
    }
});

export const { 
    onloading,
    onLoadingDataEnterprice,
    setFormFields
} = useEmpresaSlice.actions
