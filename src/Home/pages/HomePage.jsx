import { NavLink } from 'react-router-dom'
import { HomeLayout } from '../../layouts/HomeLayout'

export const HomePage = () => {
  return (
    <HomeLayout>
      <NavLink
        className="border-0 btn btn-secondary p-3 m-1 ps-5 pe-5"
        to="/client"
      >
        <div className="row flex justify-content-center">
          <span className="material-symbols-outlined">person</span>
        </div>
        Clientes
      </NavLink>

      <NavLink
        className="border-0 btn btn-secondary p-3 m-1 ps-5 pe-5"
        to="/auto"
      >
        <div className="row flex justify-content-center">
        <span className="material-symbols-outlined">directions_car</span>
        </div>
        Autos
      </NavLink>

      <NavLink
        className="border-0 btn btn-secondary p-3 m-1 ps-5 pe-5"
        to="/verServicios"
      >
        <div className="row flex justify-content-center">
        <span className="material-symbols-outlined">design_services</span>
        </div>
        Servicios
      </NavLink>

    </HomeLayout>
  )
}
