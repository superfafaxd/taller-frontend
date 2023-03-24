import { createSlice } from "@reduxjs/toolkit";


export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalOpen: false,
        modalUsers: false,
        modalClients: false,
        modalAutos: false,
        modalSearch: false,
        modalSearchCar: false
        
    },
    reducers: {
        onOpenModal: (state) => {
            state.isModalOpen = true;
        },
        onCloseModal: (state) => {
            state.isModalOpen = false;
            state.modalUsers = false;
            state.modalClients = false;
            state.modalAutos = false;
            state.modalSearch = false;
            state.modalSearchCar = false;
        },
        onModalUsers: (state) => {
            state.modalUsers = true
        },
        onModalClients: (state) => {
            state.modalClients = true
        },
        onModalAutos: (state) => {
            state.modalAutos = true
        },
        onCloseModalAutos: (state) => {
            state.modalAutos = false
        },
        onModalSearch: (state) => {
            state.modalSearch = true
        },
        onCloseModalSearchClients: (state) => {
            state.modalSearch = false
        },
        onModalSearchCar: (state) => {
            state.modalSearchCar = true
        },
        onCloseModalSearchCar: (state) => {
            state.modalSearchCar = false
        }
        
    }
});

export const {
    onOpenModal,
    onCloseModal,
    onModalUsers,
    onModalClients,
    onModalAutos,
    onModalSearch,
    onCloseModalAutos,
    onCloseModalSearchClients,
    onModalSearchCar,
    onCloseModalSearchCar
} = modalSlice.actions;
