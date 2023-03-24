import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2';
import appWebApi from "../../API/appWebApi";
import {
    onEdit,
    onError,
    onloading,
    onLoadingClientes,
    onResetData,
    resetFormFields,
    setFormFields,
    setCliID,
    onSetNameClient
} from "../../store/home/useClientesSlice";

import { onSetTotalPaginas } from "../../store/ui/PaginacionSlice";
import { useUsuarios } from "../configuraciones/useUsuarios";
import { useModalStore } from "../modal/useModalStore";

export const useClientes = () => {
    const dispath = useDispatch();
    const { closeModal } = useModalStore();
    const { selectRow } = useUsuarios()

  

    const getClients = async (limite, limitePorPagina) => {
        try {
            resetTable()
            dispath(onloading())
            const { data } = await appWebApi.post('/clientes/getClientes', { limite, limitePorPagina });
            dispath(onLoadingClientes(data.results))
            const amount = data.amount[0].amount;
            //console.log(amount)
            let cant = (amount / 10);
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
    const getClientByID = async (cli_id) => {
        try {
            const { data } = await appWebApi.get(`/clientes/getClientesById/${cli_id}`);
            const { nombre, domicilio, celular, nota, status } = data.results[0]
            dispath(setFormFields({ nombre, domicilio, celular, nota, status }))
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
    const filtroClient = async ({filtro, limite, limitePorPagina}) => {
        try {
            //dispath(onloading())
            const { data } = await appWebApi.post(`/clientes/FiltroClientes/${filtro}`,{limite, limitePorPagina});
          
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
                    dispath(onLoadingClientes(data.results))
                    const amount = data.amount[0].amount;
                    let cant = (amount / 10);
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
                title: 'Oops...',
                text: error.message
            })
            return
        }
    }

    const registerClient = async (nombre, domicilio, celular, nota, status, limite, limitePorPagina) => {
        try {
            const { data } = await appWebApi.post('/clientes/registroCliente',
                { nombre, domicilio, celular, nota, status });
            if (data.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cliente Agregado',
                    showConfirmButton: false,
                    timer: 1500
                })
                getClients(limite, limitePorPagina)
                closeModal()
            }
        } catch (error) {
            console.log('error!!');
            console.log(error);
            dispath(onError(error))
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            })
            return
        }
    }

    const updateClient = async ({ cli_id, nombre, domicilio, celular, nota, status, limite, limitePorPagina }) => {
        try {
            const { data } = await appWebApi.put(`/clientes/updateCliente/${cli_id}`,
                { nombre, domicilio, celular, nota, status });
            if (data.ok) {
                isEditClient(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario Actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
                getClients(limite, limitePorPagina) // getUsuarios();
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
            dispath(onError(error))
        }
    }

    const getRow = (tableName ) => {
        var table = document.getElementById(`${tableName}`), rIndex;

        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].onclick = function () {
                rIndex = this.rowIndex;
                console.log(`Fila ${rIndex}`);
                console.log(`Cli ID ${this.cells[0].innerHTML}`)
                dispath(setCliID(this.cells[0].innerHTML))
                 console.log(this.cells[1].innerHTML)
                 setNameClient(this.cells[1].innerHTML)
                // console.log(this.cells[2].innerHTML)

            };
        }
    }

    const deleteClient = async ({ cli_id, status, limite, limitePorPagina }) => {
        try {
            const { data } = await appWebApi.put(`/clientes/UpdateStatusCliente/${cli_id}`, { status })
            console.log({ data });
            if (data.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cliente Eliminado',
                    showConfirmButton: false,
                    timer: 1500
                })
               // resetTable()
                getClients(limite, limitePorPagina)
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
            dispath(onError(error))
        }
    }

    const resetTable = () => { dispath(onResetData()) }

    const resetFormFieldsClients = () => { dispath(resetFormFields()) }

    const isEditClient = (opt) => { dispath(onEdit(opt)) }

    const setNameClient = (name = '') => { dispath(onSetNameClient(name)) }
    const setCliIDStore = (cliID = null) => { dispath(setCliID(cliID)) } 

    const resetNameAndCliID = () =>{
        setNameClient()
        setCliIDStore()
    }

    const onCloseModal = () => {
        closeModal()
        dispath(resetFormFields())
        dispath(onEdit(false))
        dispath(setCliID(null))
    }

    const setCacheClientes =  ({ paginaActual, limite, filtro}) =>{
        console.log({ paginaActual, limite, filtro})
        localStorage.setItem(
            'cacheCliente',
            JSON.stringify({
                paginaActual: paginaActual,
                limite: limite,
                filtro: filtro,
            }),
        )


    }

    const resetLocalStorage = () =>{
        localStorage.setItem(
            'cacheCliente',
            JSON.stringify({
              paginaActual: '1',
              limite: '0',
              filtro: '',
            }),
          )
    }




    return {
        //propiedades
        //metodos
        getClients,
        getClientByID,
        registerClient,
        selectRow,
        getRow,
        resetTable,
        resetFormFieldsClients,
        isEditClient,
        onCloseModal,
        updateClient,
        deleteClient,
        filtroClient,
        resetLocalStorage,
        setNameClient,
        setCliIDStore,
        resetNameAndCliID,
       // setCacheClientes,
    }
}
