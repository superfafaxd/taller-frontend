import { Navigate, Route, Routes } from "react-router-dom"
import { Configuraciones } from "../pages/Configuraciones/Configuraciones"
import { Empresa } from "../pages/Configuraciones/Empresa/Empresa"
import { AutosPage } from "../pages/Home/autos/AutosPage"
import { ClientPage } from "../pages/Home/clientes/ClientPage"
import { Service } from "../pages/Home/servicios/Service"
import { ServiciosPage } from "../pages/Home/servicios/ServiciosPage"
import { HomePage } from "../pages/HomePage"
import { Usuarios } from "../users/Usuarios"


export const HomeRoutes = () => {
  return (
   <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/client" element={ <ClientPage /> } />
        <Route path="/auto" element={ <AutosPage /> } />
        <Route path="/verServicios" element={ <ServiciosPage /> } />
        <Route path="/verServicios/service" element={ <Service /> } />
        <Route path="/configuraciones" element={ <Configuraciones/> } />
        <Route path="/configuraciones/usuarios" element={ <Usuarios /> } />
        <Route path="/configuraciones/empresa" element={ <Empresa /> } />
        <Route path="/*" element={ <Navigate to='/' /> } />
   </Routes>
  )
}
