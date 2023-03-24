import { NavLink } from 'react-router-dom'

import {
  Agregar,
  Back,
  Editar,
  Eliminar,
  LoadingBar,
  Recargar,
} from '../../../../components/buttons/Buttons'
import { SearchComponent } from '../../../../components/Search'
import { HomeLayout } from '../../../../layouts/HomeLayout'


export const ServiciosPage = () => {
    
  return (
    
    <HomeLayout>
      <Back path="/" text="Servicios" />
      
      <div className="col">
        
      <NavLink
      className="btn btn-secondary m-1"
        to="/verServicios/Service"
      >
      <div className="row flex justify-content-center">
        <span className="material-symbols-outlined">add</span>
      </div>
      Agregar
      </NavLink>

       {/*  <Agregar /> */}
        <Editar />
        <Eliminar />
        <Recargar />
      </div>

      
      <SearchComponent />

      <LoadingBar />
      <div className="table-responsive gg">
        <table
          className="table table-bordered table-hover"
          id="tablaServicios"
          //  onClick={selectAutoID}
          //  onDoubleClick={onEditAuto}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Auto</th>
              <th scope="col">Cliente</th>
              <th scope="col">Status</th>
            </tr>

          </thead>
        </table>
      </div>
     
    </HomeLayout>
   
  )
}
