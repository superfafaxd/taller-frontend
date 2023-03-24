import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAutos } from '../../hooks/home/useAutos'
import { useModalStore } from '../../hooks/modal/useModalStore'
import { usePaginacion } from '../../hooks/paginacion/usePaginacion'
import { useForm } from '../../hooks/useForm'
import { setFormFields } from '../../store/home/useAutosSlice'

export const FormAutos = () => {
  const { initialFormFields, isEdit, autoID, editAllData } = useSelector(
    (state) => state.autosData,
  )

  const {
    formState,
    cli_id,
    cliente,
    marca,
    modelo,
    anio,
    descripcion,
    nota,
    status,
    onInputChange,
    isFormValid,
  } = useForm(initialFormFields)
  const { onCloseModal, setFormFieldsAuto, registerCar, updateCar } = useAutos()
  const { openModal, formModalSeach, closeformModalAutos } = useModalStore()

  const { limite, limitePorPagina } = usePaginacion()

  const onSubmit = (event) => {
    event.preventDefault()
    if (!isFormValid) {
      return
    }
    // console.log('yupi!!')
    // console.log(formState)
    if (!isEdit) {
      console.log('new register...')
      registerCar(
        cli_id,
        marca,
        modelo,
        anio,
        descripcion,
        nota,
        status,
        limite,
        limitePorPagina,
      )
    } else {
      console.log('update....')
      updateCar({
        auto_id: autoID,
        cli_id,
        marca,
        modelo,
        anio,
        descripcion,
        nota,
        status,
        limite,
        limitePorPagina,
      })
    }

    onCloseModal()
  }

  const onCancel = () => {
    onCloseModal()
  }

  const searchClient = () => {
    setFormFieldsAuto(formState) //guarda el form actual
    formModalSeach() //abre el modal de searchClient
    closeformModalAutos() //cierra el modal de register de autos
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <h3 className="text-center">Registro de Autos</h3>

        {!editAllData ? (
          <div className="alert alert-warning " role="alert">
            <span>Los Campos Bloquedos no se pueden Editar.</span>
          </div>
        ) : (
          <div className="d-none"></div>
        )}

        <form onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label className="pb-1 text-primary">
              Cliente<span className="text-danger">*</span>
            </label>
            <div className="d-flex justify-content-start">
              <span className="input-group-text">{cli_id} </span>
              <input
                type="text"
                className="form-control"
                placeholder="Doble click para buscar"
                required
                disabled={!editAllData}
                autoComplete="off"
                name="cliente"
                value={cliente}
                onChange={onInputChange}
                onDoubleClickCapture={searchClient}
              />
            </div>
          </div>
          <div className="form-group mb-2">
            <label className="pb-1 text-primary">
              Marca<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Marca"
              required
              disabled={!editAllData}
              autoComplete="off"
              name="marca"
              value={marca}
              onChange={onInputChange}
            />
          </div>

          <div className="d-flex justify-content-star gap-2">
            <div className="form-group mb-2">
              <label className="pb-1 text-primary">
                Modelo<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Modelo"
                required
                disabled={!editAllData}
                autoComplete="off"
                name="modelo"
                value={modelo}
                onChange={onInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <label className="pb-1 text-primary">
                Año<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Año"
                required
                disabled={!editAllData}
                autoComplete="off"
                name="anio"
                value={anio}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="form-group mb-2">
            <label className="pb-1 text-primary">Descripcion</label>
            <input
              type="text"
              className="form-control"
              placeholder="Descripcion"
              //required
              autoComplete="off"
              name="descripcion"
              value={descripcion}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label className="pb-1 text-primary">Notas</label>
            <textarea
              placeholder="Notas/Comentarios del Auto"
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
              onClick={onCancel}
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
