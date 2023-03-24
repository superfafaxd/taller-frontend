
import { NavLink } from "react-router-dom"
import { useUsuarios } from "../../../hooks/configuraciones/useUsuarios"
import { HomeLayout } from "../../../layouts/HomeLayout"


export const Configuraciones = () => {
    const { resetUserIDStore } = useUsuarios();
    const xd = (event) => {
        event.preventDefault()
        resetUserIDStore()
    }
    return (
        <HomeLayout>
           {/*  <h3>Configuraciones</h3> */}

            <NavLink
                className="border-0 btn btn-secondary p-3 m-1 ps-5 pe-5"
                to="/configuraciones/usuarios"
                
                
                
            >
                <div className="row flex justify-content-center">
                    <span className="material-symbols-outlined">
                        person
                    </span>

                </div>
                Usuarios
            </NavLink>

            <NavLink
                className="border-0 btn btn-secondary p-3 m-1"
                to="/configuraciones/empresa"
            >
                <div className="row flex justify-content-center">
                    <span className="material-symbols-outlined">
                        store
                    </span>

                </div>
                Datos Empresa</NavLink>

        </HomeLayout >
    )
}

/* 
            <button className="border-0 btn btn-secondary">
                <div className="row flex justify-content-center p-1">
                    <span className="material-symbols-outlined">
                        person
                    </span>
                    <NavLink
                        className="border-0 btn btn-secondary"
                        to="/configuraciones/usuarios"
                    >

                        Usuarios</NavLink>
                </div>

            </button>
*/
