import React, { useEffect, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { Agregar, Back, Recargar } from '../../../../components/buttons/Buttons'
import { HomeLayout } from '../../../../layouts/HomeLayout'
import 'animate.css'
import Swal from 'sweetalert2'
import { Product } from '../../Configuraciones/product/Product'
import { useModalStore } from '../../../../hooks/modal/useModalStore'
import { useSelector } from 'react-redux'
import { useForm } from '../../../../hooks/useForm'
import { getDateNow } from '../../../../helpers/getDateNow'
import { useAutos } from '../../../../hooks/home/useAutos'
import { useServices } from '../../../../hooks/home/services/useServices'
import { usePaginacion } from '../../../../hooks/paginacion/usePaginacion'

export const Service = () => {
  const { dateNow } = getDateNow()
  const { resetFormFieldsAutos } = useAutos()
  const { setFormFieldsService,resetFormFieldsService, editServise, registerService, navigate, updateService } = useServices() //use services
  const { limite, limitePorPagina } = usePaginacion()
  const { initialFormFields, isLoading, autoID, autoData } = useSelector(
    (state) => state.autosData,
  )
  const {
    initialFormFields: initialFormFieldsService,
    statusService,
    isEdit,
    fecha_ingreso,
  } = useSelector((state) => state.service)

  const {
    car_id,
    cli_id,
    cliente,
    /*  marca,
    modelo,
    anio,
    descripcion,
    nota,
    status, */
    onInputChange,
  } = useForm(initialFormFields) //form para datos de auto

  const { serv_id, motivo, total, onInputChange: onInputChangeService } = useForm(
    initialFormFieldsService,
  )

  const [date_in, setDate_in] = useState('0000-00-00') //date income
  const [dateDelivery, setDateDelivery] = useState('0000-00-00')
  const [enableDate, setEnableDate] = useState(true)
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (!isEdit) {
      console.log('get system date')
      setDate_in(dateNow)
      setDateDelivery(dateNow)
    } else {
      setDate_in(fecha_ingreso)
      //setDateDelivery(fe)
      setStatus(statusService)
      console.log('fecha desde el store')
    }
  }, [])

  useEffect(() => {
    if (status === '3') {
      setEnableDate(false)
      setDateDelivery(dateNow)
      console.log(`el status es terminado ${status}`)
    } else {
      setEnableDate(true)
      setDateDelivery('0000-00-00')
    }
  }, [status])

  const { openModal, openModalSearchCar } = useModalStore()

  const searchCar = () => {
    openModal()
    openModalSearchCar()
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!status || status == 'false') {
      Swal.fire('Selecciona el status de el auto', '', 'info')
      return
    }
    console.log({
      car_id,
      cli_id,
      motivo,
      total,
      dateNow,
      date_in,
      dateDelivery,
      status,
    })
    if(!isEdit){
      console.log('new service')      
      registerService({
        auto_id: car_id,
        cli_id: cli_id,
        motivo: motivo,
        total: total,
        fecha: dateNow,
        fecha_ingreso: date_in,
        fecha_entrega: dateDelivery,
        status: status,
        limite: limite,
        limitePorPagina: limitePorPagina
      })
    }else{
      console.log('update service')
      updateService({
        serv_id: serv_id, 
        motivo: motivo, 
        total: total, 
        fecha_entrega: dateDelivery, 
        status: status
      })
    }
   handleReset()
   navigate(-1)

  }


  const handleReset = () => {
    resetFormFieldsAutos()
     setStatus(false)
     setDate_in(dateNow)
     resetFormFieldsService()
    if(isEdit){
      editServise(false)//
    }
    
  }

  return (
    <HomeLayout>
      <Back path="/verServicios" text="Agregar/Editar Servicio" />

      <div className="animate__animated animate__fadeIn">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <form onSubmit={onSubmit}>
              {/* ----------------------------------INICIO DE LOS BOTONDES------------- */}

              <div className="d-flex justify-content-star gap-3">
                <div className="d-flex  justify-content-between">
                  <NavLink
                    // type="button"
                     className="border-0 btn btn-danger m-1"
                    to='/verServicios'
                    onClick={ () => { handleReset() } }
                  >
                    <div className="d-flex  justify-content-between">
                      <span className="material-symbols-outlined">cancel</span>
                      <span className="d-none d-sm-block"> Cancelar</span>
                    </div>
                  </NavLink>
                </div>


                <div className="d-flex  justify-content-between">
                  <button
                    type="button"
                    className="border-0 btn btn-info m-1"
                    onClick={handleReset}
                  >
                    <div className="d-flex  justify-content-between">
                      <span className="material-symbols-outlined">refresh</span>
                      Resetear
                    </div>
                  </button>
                </div>
                <div className="d-flex  justify-content-between">
                  <button
                    type="submit"
                    className="border-0 btn btn-success m-1"
                  >
                    <div className="d-flex  justify-content-between">
                      <span className="material-symbols-outlined">done</span>
                      Aceptar
                    </div>
                  </button>
                </div>
              </div>
              {/* -----------------------------------------------FIN DE LOS BOTONDES------------- */}
              <h4 className="text-center">Datos Generales Auto / Cliente</h4>

              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 form-group mb-2">
                  <label className="text-primary"> Cliente</label>
                  <div className="d-flex justify-content-start">
                    <span className="input-group-text">{cli_id} </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cliente"
                      required
                      disabled
                      name="cliente"
                      value={cliente}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 form-group">
                  <label className="text-primary">
                    Datos Generales de el Auto
                  </label>
                  <div className="d-flex justify-content-start">
                    <span className="input-group-text">{car_id} </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Doble click para buscar"
                      required
                      //disabled={!editAllData}
                      autoComplete="off"
                      name="auto"
                      value={autoData}
                      onChange={onInputChange}
                      onDoubleClickCapture={searchCar}
                    />
                  </div>
                </div>
              </div>

              {/* ---------------------TERMINAN DATOS DE AUTO Y CLIENTE------------------------- */}

              <h4 className="text-center">Datos Generales De El Servicio</h4>

              <div
                className="row" /* className=" d-flex justify-content-between" */
              >
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 form-group">
                  <label className="text-primary">
                    Estatus<span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    //onChange={onInputChangeService}
                  >
                    <option value={false}>Seleccionar</option>
                    <option value="1">En Espera (aun no se empieza)</option>
                    <option value="2">En proceso (Ya ha sido Empezado)</option>
                    <option value="3">Terminado</option>
                    <option value="4">CANCELADO</option>
                    {/*  <option value="4">Garantia</option> */}
                  </select>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 form-group mb-1">
                  <label className="text-primary">
                    Fecha Ingreso<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    //disabled={!editAllData}
                    name="fecha_ingreso"
                    value={date_in}
                    onChange={(e) => setDate_in(e.target.value)}
                  />
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 form-group">
                  <label className="text-primary">
                    Fecha Entrega<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Fecha Entrega"
                    required
                    disabled={enableDate}
                    name="fecha_entrega"
                    value={dateDelivery}
                    onChange={(e) => setDateDelivery(e.target.value)}
                  />
                </div>
              </div>
              {/* fin de status y fechas */}

              <div className="form-group mb-1">
                <label className="text-primary">
                  Motivo<span className="text-danger">*</span>
                </label>
                <textarea
                  placeholder="Motivo de el Servicio"
                  className="form-control"
                  aria-label="With textarea"
                  required
                  name="motivo"
                  value={motivo}
                  onChange={onInputChangeService}
                ></textarea>
              </div>

              <h2 className="d-flex justify-content-end">Total ${total} </h2>

              {/* -----------------------TERMINAN DATOS DE Servicio------------------------------------ */}
            </form>
            {
            isEdit?
            <Product />
            :
            <div className="alert alert-warning" role="alert">
              <strong>Guarda cambios para agregar los detalles de el servicio</strong>
            </div>
            }
          </div>
        </div>
        {/* <section>
        <h3>Historial de el auto</h3>
        tabla con historial de servicios de auto 
      </section> */}
      </div>
    </HomeLayout>
  )
}

{
  /*-------------DESCRIPCION Y NOTAS  */
}
{
  /*  
              <div className="form-group mt-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descripcion"
                  required
                  disabled
                  name="descripcion"
                  // value={marca}
                  // onChange={onInputChange}
                />
              </div> 

              <div className="form-group mt-1">
                <textarea
                  placeholder="Notas/Comentarios del Auto"
                  className="form-control"
                  aria-label="With textarea"
                  disabled
                  name="nota"
                  // value={nota}
                  // onChange={onInputChange}
                ></textarea>
              </div>
*/
}
