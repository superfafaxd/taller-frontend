import { createSlice } from '@reduxjs/toolkit'


export const useServiciosSlice = createSlice({
    name: 'servicio',
    initialState: {
        isLoading: false,
        status: 'sin-data',
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
        status: '',
        isEdit: false

    },
    reducers: {
        onloading: (state, { payload }) => {
            state.isLoading = true
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
            state.status = 'data-cargada'
            state.isLoading = false
        },
        onResetFormFieldsService: (state) => {
            state.initialFormFields = {
                serv_id: '',
                auto_id: '',
                cli_id: '',
                motivo: '',
                total: '',
                /*   fecha_ingreso: '',
                  fecha_entrega: '', */
                status: ''
            }
        },
        onSetFormFieldsService: (state, { payload }) => {
            state.initialFormFields = payload
        },
        onEditService: (state) => {
            state.isEdit = !isEdit
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
} = useServiciosSlice.actions;