import { useDispatch } from "react-redux"
import Swal from 'sweetalert2'
import appWebApi from "../../API/appWebApi";
import {
    onEdit,
    onError,
    onloading,
    onLoadingAutos,
    onResetData,
    resetFormFields,
    setautoID,
    setFormFields,
    onEditAllData,
    onSetAutoData,
    onResetAutoData
} from "../../store/home/useAutosSlice";
import { onSetTotalPaginas } from "../../store/ui/PaginacionSlice";
import { useUsuarios } from "../configuraciones/useUsuarios";
import { useModalStore } from "../modal/useModalStore";
import { useClientes } from "./useClientes";

export const useAutos = () => {
    const dispath = useDispatch();
    const { selectRow } = useUsuarios()
    const { closeModal } = useModalStore();
    const { resetNameAndCliID, setCliIDStore, setNameClient } = useClientes()



    const getAutos = async (limite, limitePorPagina) => {
        try {
            resetTable()
            dispath(onloading())
            const { data } = await appWebApi.post('/auto/getAutos', { limite, limitePorPagina });
            dispath(onLoadingAutos(data.results))
            const amount = data.amount[0].amount;
            let cant = (amount / limitePorPagina);
            let pags = Math.ceil(cant);
            dispath(onSetTotalPaginas(pags))
        } catch (error) {
            console.log('error!!');
            console.log(error);
            dispath(onError(error))
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
            return
        }
    }

    const getCarByID = async (auto_id) => {
        try {
            const { data } = await appWebApi.get(`/auto/getAutoByID/${auto_id}`);
            const { editAllData, msg, ok, code, results } = data;
            console.log(results)
            const {auto_id: car_id, cli_id, cliente, marca, modelo, anio, descripcion, nota, status } = results[0]
            setFormFieldsAuto({car_id, cli_id, cliente, marca, modelo, anio, descripcion, nota, status })
            setAutoData(`${marca} ${modelo} ${anio}`)
            // auto = `${marca} ${modelo} ${anio}`
            editAllDataCar(editAllData)
        } catch (error) {
            console.log('error!!');
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
            return
        }
    }

    const filtroAutos = async ({ filtro, limite, limitePorPagina }) => {
        try {
            const { data } = await appWebApi.post(`/auto/FiltroAutos/${filtro}`, { limite, limitePorPagina })
            if (data.ok) {
                if (data.code === 4) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'info',
                        title: 'No hay resultados con ese filtro'
                    })
                } else {
                    //dispath(onResetpaginacion())
                    resetTable()
                    dispath(onLoadingAutos(data.results))
                    const amount = data.amount[0].amount;
                    let cant = (amount / limitePorPagina);
                    let pags = Math.ceil(cant);
                    dispath(onSetTotalPaginas(pags))
                }
            } else {
                console.log(data)
                Swal.fire({
                    icon: 'error', title: 'Oops...', text: data
                })
                return
            }
        } catch (error) {
            console.log('error!!');
            console.log(error);
            dispath(onError(error))
            Swal.fire({
                icon: 'error',
                title: `Oops...${error.message}`,
                text: `${JSON.stringify(error.response.data)}`
            })
            return
        }
    }

    const registerCar = async (cli_id, marca, modelo, anio, descripcion, nota, status, limite, limitePorPagina) => {
        try {
            const { data } = await appWebApi.post('/auto/registroAuto',
                { cli_id, marca, modelo, anio, descripcion, nota, status })
            console.log(data)
            if (data.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cliente Agregado',
                    showConfirmButton: false,
                    timer: 1500
                })
                getAutos(limite, limitePorPagina)
                closeModal()

            }
        } catch (error) {
            console.log('error!!');
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            })
            return
        }
    }

    const updateCar = async ({auto_id, cli_id, marca, modelo, anio, descripcion, nota, status, limite, limitePorPagina}) => {
        try {
            const { data } = await appWebApi.put(`/auto/updateAuto/${auto_id}`,
            { cli_id, marca, modelo, anio, descripcion, nota, status });
            if (data.ok) {
                isEditCar(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Auto Actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
                getAutos(limite, limitePorPagina)
                closeModal();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data
                })
            }
        } catch (error) {
            console.log('error!!');
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            })
        }
    }

    const deleteCar = async ({auto_id, status, limite, limitePorPagina}) => {
        try {
            const { data } = await appWebApi.put(`/auto/deleteAuto/${auto_id}`, { status })
            console.log({ data });
            if (data.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Auto Eliminado',
                    showConfirmButton: false,
                    timer: 1500
                })
               // resetTable()
               getAutos(limite, limitePorPagina)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data
                })
            }
        } catch (error) {
            console.log('error!!');
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
            return
        }
    }
    const getRow = () => {
        var table = document.getElementById("tablaAutos"), rIndex;

        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].onclick = function () {
                rIndex = this.rowIndex;
                console.log(`Fila ${rIndex}`);
                console.log(`Auto ID ${this.cells[0].innerHTML}`)
                dispath(setautoID(this.cells[0].innerHTML))
                // console.log(this.cells[1].innerHTML)
                // console.log(this.cells[2].innerHTML)

            };
        }
    }

    const getRowSeach = () => {
        var table = document.getElementById("tablaAutosSeach"), rIndex;

        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].onclick = function () {
                rIndex = this.rowIndex;
                console.log(`Fila ${rIndex}`);
                console.log(`Auto ID ${this.cells[0].innerHTML}`)
                dispath(setautoID(this.cells[0].innerHTML))
                let clientData = this.cells[2].innerHTML
                let arrayCadenas = clientData.split('-')
                console.log(arrayCadenas)
                setCliIDStore(arrayCadenas[0])
                setNameClient(arrayCadenas[1])

            };
        }
    }

    const resetTable = () => { dispath(onResetData()) }

    const isEditCar = (opt) => { dispath(onEdit(opt)) }

    const editAllDataCar = (opt) => { dispath(onEditAllData(opt)) }

    const resetFormFieldsAutos = () => { dispath(resetFormFields()) }

    const onCloseModal = () => {
        closeModal()
        dispath(resetFormFields())
        isEditCar(false)  //dispath(onEdit(false))
        dispath(setautoID(null))
        resetNameAndCliID() //resetea de el store el nombre y cliId del cliente
        editAllDataCar(true) //para que se desbloqueen los campos
    }
    const setFormFieldsAuto = (formFiels) => {
        dispath(setFormFields(formFiels))
    }

    const setAutoData = (data) => {
        dispath(onSetAutoData(data))
    }
    return {
        getAutos,
        resetTable,
        selectRow,
        getRow,
        onCloseModal,
        setFormFieldsAuto,
        registerCar,
        updateCar,
        deleteCar,
        resetFormFieldsAutos,
        filtroAutos,
        isEditCar,
        getCarByID,
        editAllDataCar,
        getRowSeach
    }
}
