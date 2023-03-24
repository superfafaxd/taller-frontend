import { createSlice } from "@reduxjs/toolkit";


export const useAutosSlice = createSlice({
    name: 'autosData',
    initialState: {
        isLoading: false,
        status: 'sin-data',
        data: [],
        errorMessage: null,
        initialFormFields: {
            cli_id: '',
            cliente: '',
            marca: '',
            modelo: '',
            anio: '',
            descripcion: '',
            nota: '',
            status: true
        },
        autoID: null,
        autoData: '',
        isEdit: false,
        editAllData: true
    },
    reducers: {
        onloading: (state, { payload }) => {
            state.isLoading = true
        },
        onLoadingAutos: (state, { payload }) => {

            payload.forEach(auto => {
                const exist = state.data.some(dbdata =>
                    dbdata.auto_id === auto.auto_id
                );
                if (!exist) {
                    state.data.push(auto);
                }
            });
            state.status = 'data-cargada'
            state.isLoading = false
        },
        resetFormFields: (state) => {
            state.initialFormFields =
            {
                cli_id: '',
                cliente: '',
                marca: '',
                modelo: '',
                anio: '',
                descripcion: '',
                nota: '',
                status: true
            }
        },
        setFormFields: (state, { payload }) => {
            state.initialFormFields = payload
        },
        onError: (state, { payload }) => {
            state.errorMessage = payload
        },
        setautoID: (state, { payload }) => {
            state.autoID = payload
        },
        onEdit: (state, { payload }) => {
            state.isEdit = payload
        },
        onResetData: (state) => {
            state.data = []
        },
        onEditAllData: (state, {payload}) =>{
            state.editAllData = payload
        },
        onSetAutoData: (state, { payload }) =>{
            state.autoData = payload
        },
        onResetAutoData: (state) =>{
            state.autoData = ''
        },
    }
});

export const {
    onloading,
    onLoadingAutos,
    onError,
    setautoID,
    onEdit,
    onResetData,
    resetFormFields, 
    setFormFields,
    onEditAllData,
    onSetAutoData,
    onResetAutoData
} = useAutosSlice.actions;
