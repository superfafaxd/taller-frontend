import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {
  Agregar,
  Back,
  Editar,
  Eliminar,
  LoadingBar,
  Recargar,
} from '../../../../components/buttons/Buttons'
import { SearchComponent } from '../../../../components/Search'
import { useAutos } from '../../../../hooks/home/useAutos'
import { HomeLayout } from '../../../../layouts/HomeLayout'
import { useModalStore } from '../../../../hooks/modal/useModalStore'
import { Paginacion } from '../../../../components/paginacion/Paginacion'
import { usePaginacion } from '../../../../hooks/paginacion/usePaginacion'
import { useSearch } from '../../../../hooks/seach/useSearch'


export const AutosPage = () => {
  const { status, data, isLoading, autoID } = useSelector(
    (state) => state.autosData,
  )
  const {
    limite,
    limitePorPagina,
    resetFormFields: resetFormFieldsPaginacion,
    setFormFields: setFormFieldsPaginacion,
    setCacheAutos,
  } = usePaginacion()

  const { setFiltro } = useSearch()
  const {
    getAutos,
    resetTable,
    selectRow,
    getRow,
    filtroAutos,
    isEditCar,
    getCarByID,
    deleteCar,
  } = useAutos()
  const { openModal, formModalAutos } = useModalStore()

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

  const selectAutoID = () => {
    selectRow('tablaAutos')
    getRow()
  }

  const onOpenModal = () => {
    formModalAutos()
    openModal()
  }

  const onDeleteAuto = () => {
    if (autoID == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes seleccionar un Auto',
      })
      return
    }

    Swal.fire({
      title: 'Estas seguro de eliminar al Auto seleccionado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        resetFormFieldsPaginacion()
        deleteCar({auto_id: autoID, status: false, limite: 0,limitePorPagina: limitePorPagina}) //deleteClient({ cli_id: cliID, status: false })
        console.log('borrado')
      }
    })
  }

  const onEditAuto = () => {
    if (autoID == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes seleccionar un Auto',
      })
      return
    }
    isEditCar(true)
    onOpenModal()
    getCarByID(autoID) // getClientByID(cliID)
  }

  return (
    <HomeLayout>
      <Back path="/" text="Autos" />
      <div className="col">
        <Agregar onOpenModal={onOpenModal} />
        <Editar onEdit={onEditAuto} />
        <Eliminar onDelete={onDeleteAuto} />
        <Recargar onReload={onReset} />
      </div>

      <SearchComponent
        onSearch={filtroAutos}
        onReload={onReset}
        onSetCache={setCacheAutos}
      />

        <LoadingBar isLoading={isLoading} />
      <div className="table-responsive gg">

        <table
          className="table table-bordered table-hover"
          id="tablaAutos"
          onClick={selectAutoID}
          onDoubleClick={onEditAuto}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Auto</th>
              <th scope="col">Descripcion</th>
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
                  <td>{auto.descripcion}</td>
                  <td>
                    <span className="text-dark">{`${auto.cli_id}`}</span>-
                    {`${auto.nombre}`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Paginacion
        onSearch={getAutos}
        //onSearchFiltro{}
        modulo="autos"
      />
    </HomeLayout>
  )
}
