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
import { Paginacion } from '../../../../components/paginacion/Paginacion'
import { SearchComponent } from '../../../../components/Search'
import { useClientes } from '../../../../hooks/home/useClientes'
import { useModalStore } from '../../../../hooks/modal/useModalStore'
import { usePaginacion } from '../../../../hooks/paginacion/usePaginacion'
import { useSearch } from '../../../../hooks/seach/useSearch'
import { HomeLayout } from '../../../../layouts/HomeLayout'

export const ClientPage = () => {

  const { status, data, isLoading, cliID } = useSelector(
    (state) => state.clientesData,
  )

  const {
    limite,
     limitePorPagina,
     resetFormFields: resetFormFieldsPaginacion,
     setFormFields: setFormFieldsPaginacion,
     setCacheClientes
  } = usePaginacion()


  const {
    //propiedades
    //metodos
    getClients,
    selectRow,
    getRow,
    isEditClient,
    getClientByID,
    deleteClient,
    filtroClient,
    resetTable,
    resetLocalStorage,
  } = useClientes()

  const { openModal, formModalClients } = useModalStore()
 const { setFiltro } = useSearch();
  

  useEffect(() => {
    const cacheCliente = JSON.parse(localStorage.getItem('cacheCliente'))
    if (!cacheCliente) {
      localStorage.setItem(
        'cacheCliente',
        JSON.stringify({
          paginaActual: '1',
          limite: '0',
          filtro: '',
        }),
      )
    } else {

      const { paginaActual, limite, filtro } = cacheCliente
 
      setFormFieldsPaginacion({paginaActual})
      setFiltro({filtro})

     if (filtro.length == 0 ) {
      console.log('no hay filtro')
      resetTable()
      getClients(limite, limitePorPagina)
    } else {
      filtroClient({filtro: filtro, limite: limite, limitePorPagina: limitePorPagina})
      console.log(`si hay filtro ${filtro}`)
    }
  }

    
   
  }, [])

  // if(status == 'sin-data'){
  //   getClients()
  //   console.log('get clients')
  // }

  const onReset = () => {
    localStorage.setItem(
      'cacheCliente',
      JSON.stringify({
        paginaActual: '1',
        limite: '0',
        filtro: '',
      }),
    )
    resetFormFieldsPaginacion()//resetea la paginacion
     setFiltro({filtro: ''}) //resetea el filtro

    resetTable()
    getClients(0, limitePorPagina)
    
  }

  const onOpenModal = () => {
    formModalClients()
    openModal()
  }
  const onDeleteClient = () => {
    if (cliID == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes seleccionar un Cliente',
      })
      return
    }

    Swal.fire({
      title: 'Estas seguro de eliminar al Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClient({ cli_id: cliID, status: false, limite, limitePorPagina })
        // deleteUser({ user_id: userID, status: false })
      }
    })
  }
  const onEditClient = () => {
    if (cliID == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes seleccionar un Cliente',
      })
      return
    }
    isEditClient(true)
    onOpenModal()
    getClientByID(cliID)
  }

  const selectCliID = () => {
    selectRow('tablaClients')
    getRow('tablaClients')
  }

  return (
    <HomeLayout>
      <Back path="/" text="Clientes" />

      <div className="col">
        {/* botones */} {/* ----------BOTONES---------- */}
        <Agregar onOpenModal={onOpenModal} />
        <Editar onEdit={onEditClient} />
        <Eliminar onDelete={onDeleteClient} />
        <Recargar onReload={onReset} />
      </div>

      <SearchComponent
        onSearch={filtroClient}
        onReload={onReset}
        onSetCache={setCacheClientes}
      />

      <div className="table-responsive gg">

        <LoadingBar isLoading={isLoading} />
        <table
          className="table table-bordered table-hover"
          id="tablaClients"
          onClick={selectCliID}
          onDoubleClick={onEditClient}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Domicilio</th>
              <th scope="col">Celular</th>
              {/*  <th scope="col">Nota</th> */}
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {data.map((cli) => {
              return (
                <tr key={cli.cli_id}>
                  <td scope="row">{cli.cli_id}</td>
                  <td>{cli.nombre}</td>
                  <td>{cli.domicilio}</td>
                  <td>{cli.celular}</td>
                  {/* <td>{cli.nota}</td> */}
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
      />

      {/*       <div class="list-group" id="list-tab" role="tablist">
              {data.map((cli) => {
              return (
                <tr key={cli.cli_id}>
                  <a class="list-group-item list-group-item-action" data-bs-toggle="list"  role="tab" >
                  <td scope="row">{cli.cli_id}</td>
                  <td>{cli.nombre}</td>
                  <td>{cli.domicilio}</td>
                  <td>{cli.celular}</td>
                </a>
                </tr>
              )
            })}
          </div> */}
      {/* <footer className='fixed-bottom'>
            <h1>footer</h1>
          </footer> */}
    </HomeLayout>
  )
}
