import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAutos } from '../../hooks/home/useAutos'
import { useClientes } from '../../hooks/home/useClientes'
import { useModalStore } from '../../hooks/modal/useModalStore'
import { usePaginacion } from '../../hooks/paginacion/usePaginacion'
import { useSearch } from '../../hooks/seach/useSearch'
import { Paginacion } from '../paginacion/Paginacion'
import { SearchComponent } from '../Search'
import { FormLayout } from './FormLayout'

export const FormSeach = () => {
  const {
    getClients,
    resetTable,
    filtroClient,
    selectRow,
    getRow,
    setNameClient,
    setCliIDStore,
  } = useClientes()
  const { totalPaginas, limite, limitePorPagina } = usePaginacion()

  const { status, data, nameClient, cliID } = useSelector(
    (state) => state.clientesData,
  )
  const { initialFormFields } = useSelector((state) => state.autosData)
  const { formModalAutos, closeModalSearchClients } = useModalStore()
  const { filtro } = useSearch()
  const { setFormFieldsAuto } = useAutos()

  useEffect(() => {
    if (filtro.filtro.length == 0) {
      console.log('no hay filtro')
      getClients(limite, limitePorPagina)
    } else {
      //filtroClient(filtro, limite, limitePorPagina)
      console.log(`si hay filtro ${filtro.filtro}`)
    }
    // getClients(limiteDesde, limitePorPagina)
  }, [])

  const onReset = () => {
    //resetpaginacion()

    resetTable()
    getClients(0, limitePorPagina)
  }

  const onAccept = () => {
      const {
        cli_id, marca, modelo,
        anio,descripcion,
        nota, status,
      } = initialFormFields //

      setFormFieldsAuto({
        cli_id: cliID,
        cliente: nameClient,
        marca,
        modelo,
        anio,
        descripcion,
        nota,
        status,
      })
      closeModalSearchClients()
      formModalAutos()
  }

  const onCancel = () => {
    setNameClient()
    setCliIDStore()
    formModalAutos()
  }
  const selectCliID = () => {
    selectRow('tablaSeachClientes')
    getRow('tablaSeachClientes')
  }
  // if (status === 'sin-data') {
  //   getClients(limiteDesde, limiteHasta)
  // }

  return (
    <FormLayout text="Buscador de clientes">
      <SearchComponent onSearch={filtroClient} onReload={onReset} />
      <div className="table-responsive tableSearch">
        <table
          className="table table-bordered table-hover"
          id="tablaSeachClientes"
          onClick={selectCliID}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="">Cliente</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((cli) => {
              return (
                <tr key={cli.cli_id}>
                  <td scope="row">{cli.cli_id}</td>
                  <td>{cli.nombre}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Paginacion
        onSearch={getClients}
        onSearchFiltro={filtroClient}
        modulo={'clientes'}
        //onSearch={calcularPagina}
      />

      <div className=" d-flex justify-content-around">
        <button type="button" className="btn btn-danger m-1" onClick={onCancel}>
          <div className="row flex justify-content-center">
            <span className="material-symbols-outlined">cancel</span>
          </div>
          Cancelar
        </button>

        <button type="button" className="btn btn-success" onClick={onAccept}>
          <div className="row flex justify-content-center">
            <span className="material-symbols-outlined">done</span>
          </div>
          Aceptar
        </button>
      </div>
    </FormLayout>
  )
}
