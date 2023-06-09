import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useUsuarios } from '../../hooks/configuraciones/useUsuarios'
import { useModalStore } from '../../hooks/modal/useModalStore'
import { HomeLayout } from '../../layouts/HomeLayout'
import { CheckLoading, FilaTabla } from './FilaTabla'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import {
  Agregar,
  Back,
  Editar,
  Eliminar,
  LoadingBar,
  Recargar,
} from '../../components/buttons/Buttons'
import { SearchComponent } from '../../components/Search'
import { Paginacion } from '../../components/paginacion/Paginacion'
import { usePaginacion } from '../../hooks/paginacion/usePaginacion'
import { useSearch } from '../../hooks/seach/useSearch'

//import  '../../hooks/configuraciones/getRow.js'
//import '../../styles.css'

export const Usuarios = () => {
  const { status, isLoading, data = [], userID } = useSelector(
    (state) => state.usuariosData,
  )
  const {
    getUsuarios,
    getRow,
    selectRow,
    getUserByID,
    resetUserIDStore,
    isEditUser,
    updateStatusUser,
    deleteUser,
    filtroUser,
    resetTable,
    setUserIDStore,
  } = useUsuarios()

  const {
    limite,
    limitePorPagina,
    setCacheUsers,
    resetFormFields: resetFormFieldsUsers,
    setFormFields: setFormFieldsUsers,
  } = usePaginacion()

  const { setFiltro } = useSearch()

  const { openModal, formModalOpen } = useModalStore()

  useEffect(() => {
    const cacheUsers = JSON.parse(localStorage.getItem('cacheUsers'))
    if (!cacheUsers) {
      localStorage.setItem(
        'cacheUsers',
        JSON.stringify({
          paginaActual: '1',
          limite: '0',
          filtro: '',
        }),
      )
    } else {
      const { paginaActual, limite, filtro } = cacheUsers
      setFormFieldsUsers({ paginaActual })
      setFiltro({ filtro })
      if (filtro.length == 0) {
        console.log('no hay filtro')
        getUsuarios(limite, limitePorPagina)
      } else {
        console.log(`si hay filtro ${filtro}`)
        filtroUser({
          filtro: filtro,
          limite: limite,
          limitePorPagina: limitePorPagina,
        })
      }
    }
  }, [])

  const onOpenModal = () => {
    formModalOpen()
    openModal()
  }
  const onEditUser = (userID) => {
    setUserIDStore(userID)
    if (userID == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes seleccionar un usuario',
      })
      return
    }
    isEditUser(true)
    formModalOpen()
    openModal()
    getUserByID(userID)
  }

  const onDeleteUser = (userID) => {
    setUserIDStore(userID)
    if (userID == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes seleccionar un usuario',
      })
      return
    }

    Swal.fire({
      title: 'Estas seguro de eliminar al usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser({ user_id: userID, status: false, limite: limite, limitePorPagina: limitePorPagina })
      }
    })
  }

  const onReset = () => {
    localStorage.setItem(
      'cacheUsers',
      JSON.stringify({
        paginaActual: '1',
        limite: '0',
        filtro: '',
      }),
    )
    resetFormFieldsUsers() //resetea la paginacion
    setFiltro({ filtro: '' }) //resetea el filtro
    getUsuarios(0, limitePorPagina)
  }

  const selectUserID = () => {
    selectRow('tablaUSERS') //TODO: REVISAR BUGG
    getRow()
  }

  return (
    <HomeLayout>
      <Back path="/configuraciones" text="Usuarios" />

      <div className="col">
        <Agregar onOpenModal={onOpenModal} />
        {/* <Editar onEdit={onEditUser} /> */}
        {/* <Eliminar onDelete={onDeleteUser} /> */}
        <Recargar onReload={onReset} />
      </div>

      <SearchComponent
        onSearch={filtroUser}
        onReload={onReset}
        onSetCache={setCacheUsers}
      />

      <div className="table-responsive gg">
        {/* <div>{isLoading ? <CheckLoading /> : <> </>}</div> */}
        <LoadingBar isLoading={isLoading} />

        <table
          className="table table-bordered table-hover"
          id="tablaUSERS"
          //onClick={selectUserID}
          //onDoubleClick={onEditUser}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Usuario</th>
              <th className='text-center'>Acciones</th>
              {/* <th scope="col">Contraseña</th> */}
            </tr>
          </thead>
          <tbody className="table-group-divider ">
            <FilaTabla data={data} onEditUser={onEditUser} onDeleteUser={onDeleteUser} />
            {/*    <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td  >Adipisicing eu dolore fugiat veniam </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="1">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr> */}
          </tbody>
        </table>
      </div>
      <Paginacion
        onSearch={getUsuarios}
        onSearchFiltro={filtroUser}
        modulo="usuarios"
      />
    </HomeLayout>
  )
}
