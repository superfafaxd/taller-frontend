import { NavLink } from 'react-router-dom'
import 'animate.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const Agregar = ({ onOpenModal = () => {} }) => {
  return (
    <button
      type="button"
      className="btn btn-secondary m-1"
      onClick={onOpenModal}
    >
      <div className="row flex justify-content-center">
        <span className="material-symbols-outlined">add</span>
      </div>
      Agregar
    </button>
  )
}

export const Editar = ({ onEdit = () => {} }) => {
  return (
    <button type="button" className="btn btn-secondary m-1" onClick={onEdit}>
      <div className="row flex justify-content-center">
        <span className="material-symbols-outlined">edit</span>
      </div>
      Editar
    </button>
  )
}

export const Eliminar = ({ onDelete = () => {} }) => {
  return (
    <button
      type="button"
      className="btn btn-danger m-1"
      onClick={onDelete}
      /*  onClick={onCloseModal} */
    >
      <div className="row flex justify-content-center">
        <span className="material-symbols-outlined">delete</span>
      </div>
      Eliminar
    </button>
  )
}

export const Recargar = ({ onReload = () => {} }) => {
  return (
    <button type="button" className="btn btn-secondary m-1" onClick={onReload}>
      <div className="row flex justify-content-center">
        <span className="material-symbols-outlined">refresh</span>
      </div>
      Recargar
    </button>
  )
}

// export const Search = ({
//   onSearch = () => {console.log('buscando...')}}) => {
//   return (
//     <button
//       type="button"
//       className="border-0 btn btn-secondary"
//       onClick={onSearch}
//     >
//       <div className="d-flex  justify-content-between p-1">
//         <span className="material-symbols-outlined">search</span>
//         Buscar
//       </div>
//     </button>
//   )
// }

export const Back = ({ path = '', text = '' }) => {
  return (
     
    <div className="d-flex  justify-content-between">

      <NavLink className="border-0 btn btn-secondary m-1" to={path}>
        <div className="d-flex  justify-content-between">
          <span className="material-symbols-outlined">arrow_back</span>
          Regresar
        </div>
      </NavLink>

      <h2 className="text-black  text-center">{text}</h2>
      </div>

    
  )
}

export const LoadingBar = ({isLoading}) => {
  //const { isLoading } = useSelector(state => state.clientesData,)
  let val = 0
  if(isLoading === true){
    val = '100%'
  }else{
    val = '0%'
  }
  
  return (
    <div className="m-1 progress animate__animated animate__fadeIn">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{width: val}}
      ></div>
    </div>
  )
}

