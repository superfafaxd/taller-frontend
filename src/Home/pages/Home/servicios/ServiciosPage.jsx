import { NavLink } from 'react-router-dom'

import {
  Agregar,
  Back,
  Editar,
  Eliminar,
  LoadingBar,
  Recargar,
} from '../../../../components/buttons/Buttons'
import { Paginacion } from '../../../../components/paginacion/Paginacion'
import { SearchComponent } from '../../../../components/Search'
import { HomeLayout } from '../../../../layouts/HomeLayout'
import { useServices } from '../../../../hooks/home/services/useServices'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export const ServiciosPage = () => {
  const { data, isLoading } = useSelector((state) => state.service)
  const { 
    statusFilter, setStatusFilter, 
    startDate, setStartDate,
    endDate, setEndDate,
    getStatusService,
    handleEdit
   } = useServices()
  
 

  return (
    <HomeLayout>
      <Back path="/" text="Servicios" />

     
        <div className="col">
          <NavLink className="btn btn-secondary m-1" to="/verServicios/Service">
            <div className="row flex justify-content-center">
              <span className="material-symbols-outlined">add</span>
            </div>
            Agregar
          </NavLink>
          <Recargar />
        </div>
        <div className="row">

       
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 form-group mb-1">
          <label className="text-primary">Estatus</label>
          <select
            className="form-select"
            name="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            //onChange={onInputChangeService}
          >
            <option value="0">Todos</option>
            <option value="1">En Espera (aun no se empieza)</option>
            <option value="2">En proceso (Ya ha sido Empezado)</option>
            <option value="3">Terminado</option>
            {/*  <option value="4">Garantia</option> */}
          </select>
        </div>
        
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 form-group mb-1">
          <label className="text-primary">
            Fecha Inicio
          </label>
          <input
            type="date"
            className="form-control"
            required
            name="startDate"
            value={startDate}
            onChange={ (e) =>setStartDate(e.target.value) }
          />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 form-group mb-1">
          <label className="text-primary">
            Fecha Fin
          </label>
          <input
            type="date"
            className="form-control"
            required
            name="endDate"
            value={endDate}
            onChange={ (e) =>setEndDate(e.target.value) }
          />
        </div>
        </div>
     

      <SearchComponent />

      <LoadingBar isLoading={isLoading} />
      <div className="table-responsive gg">
        <table
          className="table table-bordered table-hover"
          id="tablaServicios"
          //  onClick={selectAutoID}
          //  onDoubleClick={onEditAuto}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th>Fecha</th>
              <th scope="col">Auto</th>
              <th scope="col">Cliente</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((serv) => {
              return (
                <tr className="text-center" key={serv.serv_id}>
                  <td scope="row">{serv.serv_id}</td>
                  <td>{serv.fecha}</td>
                  <td>{`${serv.auto_id}-${serv.auto}`}</td>
                  <td>{serv.cliente}</td>
                  <td>{getStatusService(serv.status)}</td>
                  <td>{serv.total}</td>
                  <td className="text-center" style={{ width: '200px' }}>
                    <button onClick={() => {handleEdit({serv_id: serv.serv_id })  }}
                      className="btn btn-info btn-sm me-1 mb-1"
                      data-title="Edit"
                      data-toggle="modal"
                      data-target="#edit"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button /* onClick={() => { onDeleteClient(cli.cli_id) }} */
                      className="btn btn-danger btn-sm mb-1"
                      data-title="Edit"
                      data-toggle="modal"
                      data-target="#edit"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Paginacion />
    </HomeLayout>
  )
}
