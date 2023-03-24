import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useClientes } from '../../hooks/home/useClientes'
import { useModalStore } from '../../hooks/modal/useModalStore'
import { usePaginacion } from '../../hooks/paginacion/usePaginacion'
import { useForm } from '../../hooks/useForm'
import { resetFormFields } from '../../store/home/useClientesSlice'

const formValidations = {
  nombre: [(value) => value.length > 0, 'El nombre es obligatorio'],
  domicilio: [(value) => value.length > 0, 'El domicilio es obligatorio'],
}

export const FormClients = () => {
  const { initialFormFields, isEdit, cliID } = useSelector(
    (state) => state.clientesData,
  )
  //const { closeModal } = useModalStore()

  const {
    formState,
    nombre,
    domicilio,
    celular,
    nota,
    status,
    onInputChange,
    isFormValid,
    nombreValid,
    domicilioValid,
  } = useForm(initialFormFields, formValidations)

  const { registerClient, onCloseModal, updateClient } = useClientes()
  const { limite, limitePorPagina } = usePaginacion()
  const [nombreIsValid, setNombreIsValid] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    if (!isFormValid) {
      return
    }
    if (nombre.length < 4) {
      setNombreIsValid('is-invalid')
      console.log('menor a 4 letras papas')
      console.log(formValidations)
      return
    }
    setNombreIsValid('is-valid')
    if (!isEdit) {
      console.log('new register...')
      registerClient(nombre, domicilio, celular, nota, status, limite, limitePorPagina)
    } else {
      console.log('update...')
      updateClient( {cli_id: cliID, nombre, domicilio, celular, nota, status, limite, limitePorPagina})
    }
    onCloseModal()
    
    console.log(formState)
  }


  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <h3 className="text-center">Registro de Clientes</h3>

        <form onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label className="pb-1 text-primary">Nombre</label>
            <input
              type="text"
              className={`form-control ${nombreIsValid}`}
              placeholder="Nombre"
              required
              autoComplete="off"
              name="nombre"
              value={nombre}
              onChange={onInputChange}
              
            />
            <div className="invalid-feedback">
              El nombre debe de tener al menos 4 letras
            </div>
          </div>

          <div className="form-group mb-2">
            <label className="pb-1 text-primary">Domicilio</label>
            <input
              type="text"
              className="form-control"
              placeholder="Domicilio"
              required
              autoComplete="off"
              name="domicilio"
              value={domicilio}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label className="pb-1 text-primary">Celular</label>
            <input
              type="text"
              className="form-control"
              placeholder="Celular"
              required
              autoComplete="off"
              name="celular"
              value={celular}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label className="pb-1 text-primary">Notas</label>
            <textarea
              placeholder="Notas/Comentarios de cliente"
              className="form-control"
              aria-label="With textarea"
              name="nota"
              value={nota}
              onChange={onInputChange}
            ></textarea>
          </div>

          <div className="d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-danger m-1"
              onClick={onCloseModal}
            >
              <div className="row flex justify-content-center">
                <span className="material-symbols-outlined">cancel</span>
              </div>
              Cancelar
            </button>

            <button type="submit" className="btn btn-success">
              <div className="row flex justify-content-center">
                <span className="material-symbols-outlined">done</span>
              </div>
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
