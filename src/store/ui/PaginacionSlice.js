import { createSlice } from "@reduxjs/toolkit";


export const usePaginacionSlice = createSlice({
    name: 'paginacion',
    initialState: {
        totalPaginas: '',
        limite: '0',
        limitePorPagina: '10',
        initialFormFields: 
        {
            paginaActual: '1' 
        }
    },
    reducers: {
        onSetFormFields: (state, { payload }) =>{
            state.initialFormFields = payload
        },
        onResetFormFields: (state) =>{
            state.limite = '0';
            state.initialFormFields = { paginaActual: '1'}
        },
        onSetTotalPaginas: (state, { payload }) =>{
            state.totalPaginas = payload
        },
        onSetLimite: (state, { payload }) =>{
            state.limite = payload
        },
        onResetLimite: (state) =>{
            state.limite = '0';
        },
        onCalcularpaginas: (state) =>{
            const {paginaActual} = state.initialFormFields
            let limiteHasta = (paginaActual * 10)
            state.limite = `${(limiteHasta - 10)}`
           // console.log(`limite ${state.limite}`)
        },
        onSetCacheClientes: (state, { payload }) =>{
            const {paginaActual} = state.initialFormFields
            localStorage.setItem(
            'cacheCliente',
            JSON.stringify({
                paginaActual: paginaActual,
                limite: state.limite,
                filtro: payload.filtro,
            }),
        )},
        onSetCacheAutos: (state, { payload }) =>{
            const {paginaActual} = state.initialFormFields
            localStorage.setItem(
            'cacheAutos',
            JSON.stringify({
                paginaActual: paginaActual,
                limite: state.limite,
                filtro: payload.filtro,
            }),
        )},
        onSetCacheUsers: (state, { payload }) =>{
            const {paginaActual} = state.initialFormFields
            localStorage.setItem(
            'cacheUsers',
            JSON.stringify({
                paginaActual: paginaActual,
                limite: state.limite,
                filtro: payload.filtro,
            }),
        )},
    
  
    }
});

export const {
onSetTotalPaginas,
onSetLimite,
onResetLimite,
onCalcularpaginas,
onSetFormFields,
onResetFormFields,
onSetCacheClientes,
onSetCacheAutos,
onSetCacheUsers,
} = usePaginacionSlice.actions;
