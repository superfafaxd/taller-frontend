import { useDispatch, useSelector } from "react-redux"
import {
    onCloseModal,
    onOpenModal,
    onModalUsers,
    onModalClients,
    onModalAutos,
    onModalSearch,
    onCloseModalAutos,
    onCloseModalSearchClients,
    onModalSearchCar,
    onCloseModalSearchCar
} from "../../store/ui/modalSlice";

export const useModalStore = () => {
    const dispatch = useDispatch();

    const { isModalOpen, modalUsers, modalClients, modalAutos, modalSearch, modalSearchCar } = useSelector(state => state.modal);
    const openModal = () => {
        dispatch(onOpenModal())
    }
    const closeModal = () => {
        dispatch(onCloseModal())
    }

    const formModalOpen = () => {
        dispatch(onModalUsers())
    }

    const formModalClients = () => {
        dispatch(onModalClients())
    }
    const formModalAutos = () => {
        dispatch(onModalAutos())
    }
    const closeformModalAutos = () => {
        dispatch(onCloseModalAutos())
    }
    const formModalSeach = () => {//search clientes
        dispatch(onModalSearch())
    }
    const closeModalSearchClients = () => {
        dispatch(onCloseModalSearchClients())
    }

    const openModalSearchCar = () => {
        dispatch(onModalSearchCar())
    }
    const closeModalSearchCar = () => {
        dispatch(onCloseModalSearchCar())
    }

    return {
        //propiedades
        isModalOpen,
        modalUsers,
        modalClients,
        modalAutos,
        modalSearch,
        modalSearchCar,
        //metodos
        openModal,
        closeModal,
        formModalOpen,
        formModalClients,
        formModalAutos,
        formModalSeach,
        closeformModalAutos,
        closeModalSearchClients,
        openModalSearchCar,
        closeModalSearchCar

    }
}
