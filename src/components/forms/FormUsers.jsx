import { useState } from "react";
import { useModalStore } from "../../hooks/modal/useModalStore"
import { useForm } from "../../hooks/useForm";
import 'animate.css';
import { useUsuarios } from "../../hooks/configuraciones/useUsuarios";
import { useSelector } from "react-redux";

/* const initialFormFields = {
    nombre: '',
    user: '',
    pass: '',
    passConfirm: '',
    status: true
} */
const formValidations = {
    nombre: [(value) => value.length > 0, 'El nombre es obligatorio'],
    user: [(value) => value.length > 0, 'El Usuario es obligatorio'],
    pass: [(value) => value.length >= 3, 'El password debe de tener al menos 3 caracteres'],
    passConfirm: [(value) => value.length >= 3, 'El password debe de tener al menos 3 caracteres']

}


export const FormUsers = () => {
    const { initialFormFields, isEdit, userID } = useSelector(state => state.usuariosData)
    const { closeModal } = useModalStore();
    const { formState, nombre, user, pass, passConfirm, status, onInputChange,
        isFormValid, nombreValid, userValid, passValid, passConfirmValid

    } = useForm(initialFormFields, formValidations);

    const { registerUser, resetFormFieldsUSer, isEditUser, updateUser, resetUserIDStore} = useUsuarios();

    const [error, seterror] = useState(null);

    const onCloseModal = () => {
        closeModal()
        resetFormFieldsUSer()
        isEditUser(false)
        resetUserIDStore()
    }

    const onSubmit = (event) => {
        event.preventDefault()
        seterror(null)
        if (!isFormValid) {
            console.log({ nombreValid, userValid, passValid, passConfirmValid })
            return
        }
        if (pass != passConfirm) {
            seterror('no coinciden las contraseñas paps')
            console.log('no coinciden las contraseñas paps')
            return
        }
        if (!isEdit) {
            registerUser(nombre, user, pass, passConfirm, status,)
            console.log('registro new');
        } else {
            console.log('update')
            //console.log({user_id: userID, nombre, user, pass, passConfirm, status})
            updateUser({user_id: userID, nombre, user, pass, status})
            //isEditUser(false)
        }
        resetFormFieldsUSer()
        resetUserIDStore()
        //console.log(formState);

    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">

                <div /* className="col-md-12" */>
                    <h3 className='text-center'>Registro de usuario</h3>

                    <form onSubmit={onSubmit} >
                        <div className="form-group mb-2">
                        <label className="pb-1 text-primary"
                        >Nombre<span className="text-danger">*</span>
                        </label>
                            <input
                                type='text'
                                className="form-control"
                                placeholder="Nombre"
                                required
                                autoComplete="off"
                                name='nombre'
                                value={nombre}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                        <label className="pb-1 text-primary">
                            Nombre de Usuario<span className="text-danger">*</span>
                            </label>
                            <input
                                type='text'
                                className="form-control"
                                placeholder="Usuario"
                                required
                                autoComplete="off"
                                name='user'
                                value={user}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                        <label className="pb-1 text-primary">
                            Contraseña<span className="text-danger">*</span>
                            </label>
                            <input
                                type='password'
                                className="form-control"
                                placeholder="Contraseña"
                                required
                                autoComplete="off"
                                name='pass'
                                value={pass}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                        <label className="pb-1 text-primary">
                            Confirmar Contraseña<span className="text-danger">*</span>
                            </label>
                            <input
                                type='password'
                                className="form-control"
                                placeholder="Confirmar Contraseña"
                                required
                                autoComplete="off"
                                name='passConfirm'
                                value={passConfirm}
                                onChange={onInputChange}

                            />

                        </div>
                        {
                            (error != null)
                                ?
                                <div className="alert alert-danger animate__animated animate__headShake" role="alert">
                                    <strong></strong> {error}
                                </div> : <></>
                        }

                        {/*      <div className="form-group row">
                                <label >Estatus del Usuario</label>
                                <div className="form-check form-switch mb-2">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"   onChange={onInputChange} value={status}    checked  />
                                    <label className="form-check-label">Checked switch checkbox input</label>
                                </div>
                            </div> */}
                        <div className='d-flex justify-content-around'>
                            <button
                                type='button'
                                className='btn btn-danger m-1'
                                onClick={onCloseModal}
                            >
                                <div className="row flex justify-content-center">
                                    <span className="material-symbols-outlined">
                                        cancel
                                    </span>
                                </div>
                                Cancelar
                            </button>

                            <button
                                type='submit'
                                className='btn btn-success'
                            >
                                <div className="row flex justify-content-center">
                                    <span className="material-symbols-outlined">
                                        done
                                    </span>
                                </div>
                                Aceptar

                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}
