import { createSlice } from "@reduxjs/toolkit";

export const useClientesSlice = createSlice({
    name: 'clientesData',
    initialState: {
        isLoading: false,
        status: 'sin-data',
        data: [],
        errorMessage: null,
        initialFormFields: {
            nombre: '',
            domicilio: '',
            celular: '',
            nota: '',
            status: true
        },
        cliID: null,
        nameClient: '', //para el campo cliente en registro de autos
        isEdit: false
    },
    reducers: {
        onloading: (state, { payload }) => {
            state.isLoading = true
        },
        onLoadingClientes: (state, { payload }) => {

            payload.forEach(cli => {
                const exist = state.data.some(dbdata =>
                    dbdata.cli_id === cli.cli_id
                );
                if (!exist) {
                    state.data.push(cli);
                }
            });
            state.status = 'data-cargada'
            state.isLoading = false
        },
        resetFormFields: (state) => {
            state.initialFormFields =
            {
                nombre: '',
                domicilio: '',
                celular: '',
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
        setCliID: (state, { payload }) => {
            state.cliID = payload
        },
        onEdit: (state, { payload }) => {
            state.isEdit = payload
        },
        onResetData: (state) => {
            state.data = []
        },
        onSetCacheClientes: (state, { payload }) => {
            localStorage.setItem(
                'cacheCliente',
                JSON.stringify({
                    paginaActual: payload.paginaActual,
                    limite: payload.limite,
                    filtro: payload.filtro,
                }),
            )
        },
        onSetNameClient: ( state, { payload }) =>{
            state.nameClient = payload
        }
    }
});


export const {
    onloading,
    onLoadingClientes,
    resetFormFields,
    setFormFields,
    onError,
    setCliID,
    onEdit,
    onResetData,
    onSetPaginaActual,
    onSetTotalPaginas,
    onSetLimiteDesde,
    onSetLimiteHasta,
    onSetCacheClientes,
    onSetNameClient,
} = useClientesSlice.actions; 
