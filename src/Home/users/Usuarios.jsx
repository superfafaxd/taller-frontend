import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FormModal } from '../../components/FormModal'
import { NavLink } from 'react-router-dom'
import { useUsuarios } from '../../hooks/configuraciones/useUsuarios'
import { useModalStore } from '../../hooks/modal/useModalStore'
import { HomeLayout } from '../../layouts/HomeLayout'
import { CheckLoading, FilaTabla } from './FilaTabla'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { Agregar, Back, Editar, Eliminar, LoadingBar, Recargar } from '../../components/buttons/Buttons'
import { SearchComponent } from '../../components/Search'
import { Paginacion } from '../../components/paginacion/Paginacion'

//import  '../../hooks/configuraciones/getRow.js'
//import '../../styles.css'
let initialFormFields = {filtro: ''}
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
  } = useUsuarios()

  const { openModal, formModalOpen } = useModalStore()

  useEffect(() => {
    getUsuarios()
    console.log('render')
  }, [status])

  // if (status === 'sin-data') {

  // }

  const onOpenModal = () => {
    formModalOpen()
    openModal()
  }
  const onEditUser = () => {
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

  const onDeleteUser = () => {
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
        deleteUser({ user_id: userID, status: false })
      }
    })
  }

  const onReset = () =>{
    initialFormFields = {filtro: ''}
    resetTable()
    getUsuarios()
  }

  const selectUserID = () => {
    selectRow('tablaUSERS') //TODO: REVISAR BUGG
    getRow()
  }

  return (
    <HomeLayout>
      <Back path="/configuraciones" text='Usuarios' />

      <div className="col">

        <Agregar onOpenModal={onOpenModal} />

        <Editar onEdit={onEditUser} />

        <Eliminar onDelete={onDeleteUser} />

        <Recargar onReload={onReset} />
      </div>

      <SearchComponent 
      onSearch={filtroUser}
       onReload={onReset}
       />

      <div className="table-responsive">
        {/* <div>{isLoading ? <CheckLoading /> : <> </>}</div> */}
        <LoadingBar isLoading={isLoading} />

        <table
          className="table table-bordered table-hover"
          id="tablaUSERS"
          onClick={selectUserID}
          onDoubleClick={onEditUser}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Usuario</th>
              {/* <th scope="col">Contraseña</th> */}
            </tr>
          </thead>
          <tbody className="table-group-divider ">
            <FilaTabla data={data} />
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
      
      />
    </HomeLayout>
  )
}
