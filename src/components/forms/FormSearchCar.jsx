import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAutos } from '../../hooks/home/useAutos'
import { useModalStore } from '../../hooks/modal/useModalStore'
import { usePaginacion } from '../../hooks/paginacion/usePaginacion'
import { useSearch } from '../../hooks/seach/useSearch'
import { Paginacion } from '../paginacion/Paginacion'
import { SearchComponent } from '../Search'
import { FormLayout } from './FormLayout'
import Swal from 'sweetalert2'


export const FormSearchCar = () => {
  const { status, nameClient, cliID } = useSelector(
    (state) => state.clientesData,
  )
  const { initialFormFields, data, autoID } = useSelector((state) => state.autosData)
  const {
    limitePorPagina,
    resetFormFields: resetFormFieldsPaginacion,
    setFormFields: setFormFieldsPaginacion,
    setCacheAutos,
  } = usePaginacion()
  const { closeModal } = useModalStore()

  const { setFiltro } = useSearch()

  const {
    getAutos,
    resetTable,
    selectRow,
    getRow,
    filtroAutos,
    isEditCar,
    getCarByID,
    getRowSeach,
    setFormFieldsAuto,
    onCloseModal
  } = useAutos()

  useEffect(() => {
    const cacheAutos = JSON.parse(localStorage.getItem('cacheAutos'))
    if (!cacheAutos) {
      localStorage.setItem(
        'cacheAutos',
        JSON.stringify({
          paginaActual: '1',
          limite: '0',
          filtro: '',
        }),
      )
    } else {
      const { paginaActual, limite, filtro } = cacheAutos
      setFormFieldsPaginacion({ paginaActual })
      setFiltro({ filtro })
      if (filtro.length == 0) {
        console.log('no hay filtro')
        getAutos(limite, limitePorPagina)
      } else {
        console.log(`si hay filtro ${filtro}`)
        filtroAutos({
          filtro: filtro,
          limite: limite,
          limitePorPagina: limitePorPagina,
        })
      }
    }
  }, [])

  const selectAutoID = () => {
    selectRow('tablaAutosSeach')
    getRowSeach()
  }

  const onReset = () => {
    localStorage.setItem(
      'cacheAutos',
      JSON.stringify({
        paginaActual: '1',
        limite: '0',
        filtro: '',
      }),
    )
    resetFormFieldsPaginacion() //resetea la paginacion
    setFiltro({ filtro: '' }) //resetea el filtro
    getAutos(0, limitePorPagina)
  }

  const onAccept = () => {
    if (autoID == null) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Debes seleccionar un Auto',
        })
        return
      }
    getCarByID(autoID)
    onCloseModal()
  
}

  const onCancel = () => {
    //setNameClient()
    //setCliIDStore()
    closeModal()
  }

  return (
    <FormLayout text="Buscador de Autos">
      <SearchComponent
        onSearch={filtroAutos}
        onReload={onReset}
        setCacheAutos={setCacheAutos}
        text="Filtro por Nombre de Cliente o ID Auto / Cliente"
      />

      <div className="table-responsive gg">
        <table
          className="table table-bordered table-hover"
          id="tablaAutosSeach"
          onClick={selectAutoID}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Auto</th>
              <th scope="col">Cliente</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((auto) => {
              return (
                <tr key={auto.auto_id}>
                  <td scope="row">{auto.auto_id}</td>
                  <td>
                    {auto.marca} {auto.modelo} {auto.anio}
                  </td>
                  <td>
                    {`${auto.cli_id}`} - {`${auto.nombre}`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Paginacion onSearch={getAutos} modulo="autos" />

      <div className=" d-flex justify-content-around">
        <button type="button" className="btn btn-danger m-1" onClick={onCancel}>
          <div className="row flex justify-content-center">
            <span className="material-symbols-outlined">cancel</span>
          </div>
          Cancelar
        </button>

        <button
          type="button"
          className="btn btn-success" onClick={onAccept}
        >
          <div className="row flex justify-content-center">
            <span className="material-symbols-outlined">done</span>
          </div>
          Aceptar
        </button>
      </div>
    </FormLayout>
  )
}
