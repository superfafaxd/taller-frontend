import { useDispatch } from "react-redux";
import appWebApi from "../../API/appWebApi";
import {
  onLoadingUsuarios,
  onloading,
  onError,
  setFormFields,
  setUserID,
  resetFormFields,
  onEdit,
  onResetData
} from "../../store/configuraciones/usuariosSlice";
import { useModalStore } from "../modal/useModalStore";
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import { onSetTotalPaginas } from "../../store/ui/PaginacionSlice";


export const useUsuarios = () => {
  const dispath = useDispatch();
  const { closeModal } = useModalStore();


  const getRow = () => {
    var table = document.getElementById("tablaUSERS"), rIndex;

    for (var i = 1; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        rIndex = this.rowIndex;
        console.log(`Fila ${rIndex}`);
        console.log(`user ID ${this.cells[0].innerHTML}`)
        dispath(setUserID(this.cells[0].innerHTML))
        // console.log(this.cells[1].innerHTML)
        // console.log(this.cells[2].innerHTML)

      };
    }
  }
  const resetUserIDStore = () => {
    dispath(setUserID(null))
  }

  const setUserIDStore = (userID) => {
    dispath(setUserID(userID))
  }

  const selectRow = (table) => {
    var table = document.getElementById(`${table}`);

    var selected = table.getElementsByClassName('selected');
    table.onclick = highlight;

    function highlight(e) {
      if (selected[0]) selected[0].className = '';
      e.target.parentNode.className = 'selected';
    }
  }

  const getUserByID = async (user_id) => {

    try {
      const { data } = await appWebApi.get(`/usuarios/getUserbyID/${user_id}`)
      const { nombre, user, pass, status } = data.results[0]

      var bytes = CryptoJS.AES.decrypt(pass, '@borjascript');
      var passDescrypt = bytes.toString(CryptoJS.enc.Utf8);

      const passConfirm = passDescrypt;
      console.log({ nombre: nombre, user: user, passEncrypt: pass, passDescrypt: passConfirm, status: status })

      dispath(setFormFields({ nombre, user, pass: passDescrypt, passConfirm, status }))
    } catch (error) {
      console.log('error!!');
      console.log(error);
      dispath(onError(error))
    }
  }

  const filtroUser = async ({ filtro, limite, limitePorPagina }) => {
    try {
      //dispath(onloading())
      const { data } = await appWebApi.post(`/usuarios/FiltroUser/${filtro}`,
        { limite, limitePorPagina });
      console.log(data)
      if (data.ok) {
        if (data.code === 4) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'info',
            title: 'No hay resultados con ese filtro'
          })
        } else {
          resetTable()
          dispath(onLoadingUsuarios(data.results))

          const amount = data.amount[0].amount;
          let cant = (amount / limitePorPagina);
          let pags = Math.ceil(cant);
          dispath(onSetTotalPaginas(pags))
        }
      } else {
        Swal.fire({
          icon: 'error', title: 'Oops...', text: data
        })
        return
      }
    } catch (error) {
      console.log('error!!');
      console.log(error);
      dispath(onError(error))
      Swal.fire({
        icon: 'error',
        title: `Oops...${error.message}`,
        text: `${JSON.stringify(error.response.data)}`
      })
      return
    }
  }

  const resetFormFieldsUSer = () => {
    dispath(resetFormFields())
  }

  const getUsuarios = async (limite, limitePorPagina) => {

    try {
      resetTable()
      dispath(onloading(true))
      const { data } = await appWebApi.post('/usuarios/getUsers',
        { limite, limitePorPagina });
      dispath(onLoadingUsuarios(data.results))

      const amount = data.amount[0].amount;
      let cant = (amount / limitePorPagina);
      let pags = Math.ceil(cant);
      dispath(onSetTotalPaginas(pags))
    } catch (error) {
      console.log('error!!');
      console.log(error);
      dispath(onError(error))
      Swal.fire({
        icon: 'error',
        title: `Oops...${error.message}`,
        text: `${JSON.stringify(error.response.data)}`
      })
      return
    }
  }

  const registerUser = async (nombre, user, pass, passConfirm, status, limite, limitePorPagina) => {
    try {
      const { data } = await appWebApi.post('/usuarios/registroUsuario', { nombre, user, pass, passConfirm, status });
      if (data.ok) {
        if (data.code == 1) {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: data.msg
          })
          return
        } else if (data.code == 2) {

          Swal.fire({
            title: data.msg,
            text: "Deseas Recuperar el Usuario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Recuperar'
          }).then((result) => {
            if (result.isConfirmed) {
              const { user_id, nombre, user, pass, status } = data.userExist[0]
              console.log({ status: !status });
              //dispath(setFormFields({nombre, user, pass, passConfirm: pass, status}))
              updateStatusUser({ user_id: user_id, status: !status })
            }
          })


        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario Agregado',
            showConfirmButton: false,
            timer: 1500
          })
          getUsuarios(limite, limitePorPagina);
          closeModal();
        }

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        console.log({ data })
      }

    } catch (error) {
      console.log('error!!');
      console.log(error);
      dispath(onError(error))
    }
  }

  const updateStatusUser = async ({ user_id, status, limite, limitePorPagina }) => {
    try {
      const { data } = await appWebApi.put(`/usuarios/updateStatusUser/${user_id}`, { status })
      console.log({ data });
      if (data.ok) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Eliminado',
          showConfirmButton: false,
          timer: 1500
        })

        closeModal();
        //resetTable()
        getUsuarios(limite, limitePorPagina);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data
        })
      }
    } catch (error) {
      console.log('error!!');
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      })
      dispath(onError(error))
    }
  }

  const deleteUser = async ({ user_id, status }) => {
    try {
      const { data } = await appWebApi.put(`/usuarios/updateStatusUser/${user_id}`, { status })
      console.log({ data });
      if (data.ok) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Eliminado',
          showConfirmButton: false,
          timer: 1500
        })
        resetTable()
        getUsuarios();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data
        })
      }
    } catch (error) {
      console.log('error!!');
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      })
      dispath(onError(error))
    }
  }

  const updateUser = async ({ user_id, nombre, user, pass, status, limite, limitePorPagina }) => {
    try {
      const { data } = await appWebApi.put(`/usuarios/updateUser/${user_id}`, { nombre, user, pass, status });
      if (data.ok) {
        isEditUser(false)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
       // resetTable()
        getUsuarios(limite, limitePorPagina);
        closeModal();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data
        })
      }
    } catch (error) {
      console.log('error!!');
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      })
      dispath(onError(error))
    }
  }

  const resetTable = () => {
    dispath(onResetData())
  }
  const isEditUser = (opt) => {
    dispath(onEdit(opt))
  }

  return {
    getUsuarios,
    registerUser,
    getRow,
    selectRow,
    getUserByID,
    resetFormFieldsUSer,
    resetUserIDStore,
    setUserIDStore,
    isEditUser,
    updateUser,
    updateStatusUser,
    deleteUser,
    filtroUser,
    resetTable,
  }
}
