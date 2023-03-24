import { createSlice } from '@reduxjs/toolkit'


export const useSearchSlice = createSlice({
    name: 'search',
    initialState: {
        initialFormFields: {
            filtro: ''
        },
    },
    reducers: {
        setFormFields: (state, { payload }) => {
            state.initialFormFields = payload
        },
        resetFormFields: (state) => {
            state.initialFormFields =
            {
                filtro: ''
            }
        }
    }
});

export const {
    setFormFields,
    resetFormFields,
} = useSearchSlice.actions;
