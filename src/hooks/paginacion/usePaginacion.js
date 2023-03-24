import { useDispatch, useSelector } from "react-redux"
import {
    onCalcularpaginas,
    onResetFormFields,
    onSetFormFields,
    onResetLimite,
    onSetCacheClientes,
    onSetLimite,
    onSetCacheAutos
} from "../../store/ui/PaginacionSlice"
import { useClientes } from "../home/useClientes"


export const usePaginacion = () => {
    const dispath = useDispatch()
    const {
        totalPaginas,
        limite,
        paginaActual,
        limitePorPagina,
    } = useSelector(state => state.paginacion)



   
    const resetLimite = () =>{
        dispath(onResetLimite())
    }

    const setFormFields = ({paginaActual}) => {
        dispath(onSetFormFields({paginaActual}))
        calcularpaginas({paginaActual})
        //calcularLimite()
    }
    const calcularLimite = () => {
        dispath(onCalcularpaginas())
    }
    const resetFormFields = () =>{
        dispath(onResetFormFields())
    }
    // const setpaginacionParams = (payload) => {
    //     dispath(onSetpaginacionParams(payload))
    // }
    const setCacheClientes = ({filtro}) => {
        dispath(onSetCacheClientes({filtro}))
    }
    const setCacheAutos = ({filtro}) => {
        dispath(onSetCacheAutos({filtro}))
    }
    const calcularpaginas = ({paginaActual}) =>{
        //const {paginaActual} = state.initialFormFields
        let limiteHasta = (paginaActual * 10)
        let limit = `${(limiteHasta - 10)}`
        dispath(onSetLimite(limit))
    }



    return {
        //propiedades
        totalPaginas,
        limitePorPagina,
        limite,
        //metodos
        calcularLimite,
        setFormFields,
        resetFormFields,
        resetLimite,
        setCacheClientes,
        setCacheAutos,
        calcularpaginas,
    }
}
