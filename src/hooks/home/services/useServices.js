import { useDispatch } from "react-redux"
import {
  onEditService,
  onResetFormFieldsService,
  onResetData,
  onloading,
  onLoadingServices,
  onSetFormFieldsService,
  onSetStatus
} from "../../../store/home/services/useServiciosSlice"
import Swal from 'sweetalert2';
import appWebApi from "../../../API/appWebApi";
import { useEffect, useState } from "react";
import { onSetTotalPaginas } from "../../../store/ui/PaginacionSlice";
import { getDateNow } from "../../../helpers/getDateNow";
import { useNavigate } from "react-router-dom";
import { useAutos } from "../useAutos";

export const useServices = () => {
  const { setFormFieldsAuto, setAutoData } = useAutos()
  const { dateNow } = getDateNow()
  const navigate = useNavigate()
  const dispath = useDispatch()
  const [statusFilter, setStatusFilter] = useState("0")
  const [startDate, setStartDate] = useState('2022-12-22')
  const [endDate, setEndDate] = useState(dateNow)

  useEffect(() => {

    getServices({ limite: '0', limitePorPagina: '10', startDate: startDate, endDate: endDate, statusFilter: statusFilter })

  }, [statusFilter, startDate, endDate])

  const getServices = async ({ limite, limitePorPagina, startDate, endDate, statusFilter }) => {

    try {
      resetTable()
      dispath(onloading(true))
      const { data } = await appWebApi.post('/servicio/getServices',
        { limite, limitePorPagina, startDate, endDate, statusFilter })
      dispath(onLoadingServices(data.results))
      const amount = data.amount[0].amount;
      let cant = (amount / 10);
      let pags = Math.ceil(cant);
      dispath(onSetTotalPaginas(pags))
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

  const registerService = async (
    { serv_id, auto_id, cli_id, motivo, total, fecha, fecha_ingreso, fecha_entrega, status, limite, limitePorPagina }
  ) => {
    try {
      const { data } = await appWebApi.post('/servicio/agregarServicio',
        { serv_id, auto_id, cli_id, motivo, total, fecha, fecha_ingreso, fecha_entrega, status })
      console.log(data)
      if (data.ok) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Servicio Agregado',
          showConfirmButton: false,
          timer: 1500
        })
        // getServices({limite, limitePorPagina, startDate: })
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

  const updateService = async ({ serv_id, motivo, total, fecha_entrega, status }) => {
    console.log({ serv_id, motivo, total, fecha_entrega, status })
    try {
      onLoading(true)
      const { data } = await appWebApi.put(`/servicio/updateServicio/${serv_id}`, {
        motivo, total, fecha_entrega, status
      })
      if (data.ok) {
        editServise(false)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Servicio Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/verServicios')
      }
      onLoading(false)
    } catch (error) {
      console.log('error!!');
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: `Oops...${error.message}`,
        text: JSON.stringify(error.response.data)
    })
      return
    }
  }

  const getServiceById = async ({ serv_id }) => {
    try {
      onLoading(true)
      const { data } = await appWebApi.get(`/servicio/getServicioById/${serv_id}`)
      console.log(data)
      const { ok, detallesServ, servicio } = data
      const { serv_id: SERV_ID, auto_id, auto, cli_id, nameClient, motivo, status, total } = servicio[0]
      setFormFieldsService({ serv_id: SERV_ID, auto_id: auto_id, cli_id: cli_id, motivo: motivo, total: total })
      setStatus(status)
      setFormFieldsAuto({ car_id: auto_id, cli_id, cliente: nameClient, marca: '', modelo: '', anio: '', descripcion: '', nota: '', status: true })
      setAutoData(auto)
      //
      navigate('/verServicios/Service')
      onLoading(false)

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

  const getStatusService = (status) => {
    const STATUS_CAR = {
      1: 'En Espera (aun no se empieza)',
      2: 'En proceso (Ya ha sido Empezado)',
      3: 'Terminado',
      4: 'CANDELADO'
    }
    return STATUS_CAR[status] || 'STATUS INVALID'
  }


  const handleEdit = ({ serv_id }) => {
    editServise(true)
    getServiceById({ serv_id })
  }

  const setFormFieldsService = ({ serv_id, auto_id, cli_id, motivo, total }) => {
    dispath(onSetFormFieldsService({ serv_id, auto_id, cli_id, motivo, total }))
  }

  const resetFormFieldsService = () => {
    dispath(onResetFormFieldsService())
  }
  const editServise = (opt) => {
    dispath(onEditService(opt))
  }
  const resetTable = () => dispath(onResetData())

  const onLoading = (opt) => dispath(onloading(opt))
  const setStatus = (st) => dispath(onSetStatus(st))

  return {
    //properties
    navigate,
    //states
    statusFilter,
    setStatusFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    //metods
    handleEdit,
    setFormFieldsService,
    editServise,
    getStatusService,
    registerService,
    resetFormFieldsService,
    updateService
  }
}
