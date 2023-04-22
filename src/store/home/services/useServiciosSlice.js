import { createSlice } from '@reduxjs/toolkit'


export const useServiciosSlice = createSlice({
    name: 'servicio',
    initialState: {
        isLoading: false,
        statusData: 'sin-data',
        data: [],
        initialFormFields: {
            serv_id: '',
            auto_id: '',
            cli_id: '',
            motivo: '',
            total: 0.00,
            /*      fecha_ingreso: '0000-00-0',
                 fecha_entrega: '',
                 status: '' */

        },
        fecha_ingreso: '2000-10-20', //(aa-mm-dd)
        fecha_entrega: '',
        statusService: '',
        isEdit: false

    },
    reducers: {
        onloading: (state, { payload }) => {
            state.isLoading = payload
        },
        onLoadingServices: (state, { payload }) => {

            payload.forEach(serv => {
                const exist = state.data.some(dbdata =>
                    dbdata.serv_id === serv.serv_id
                );
                if (!exist) {
                    state.data.push(serv);
                }
            });
            state.statusData = 'data-cargada'
            state.isLoading = false
        },
        onResetFormFieldsService: (state) => {
            state.initialFormFields = {
                serv_id: '',
                auto_id: '',
                cli_id: '',
                motivo: '',
                total: 0.00,
                /*   fecha_ingreso: '',
                  fecha_entrega: '', */
                //status: ''
            }
        },
        onSetFormFieldsService: (state, { payload }) => {
            state.initialFormFields = payload
        },
        onEditService: (state, {payload}) => {
            state.isEdit = payload
        },
        onResetData: (state) => {
            state.data = []
        },
        onSetStatus: (state, {payload}) =>{
            state.statusService = payload
        }
    }
});

export const {
    onloading,
    onLoadingServices,
    onResetFormFieldsService,
    setFormFieldsService,
    onSetFormFieldsService,
    onEditService,
    onResetData,
    onSetStatus,
} = useServiciosSlice.actions;