import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFormFields } from '../../store/ui/searchSlice'

export const useSearch = () => {
    const dispath = useDispatch()
    const { initialFormFields: filtro} = useSelector(state => state.search)

    const setFiltro = ({filtro}) =>{
        dispath(setFormFields({filtro}))
    }

  return {
    //propiedades
    filtro,
    //metodos
    setFiltro,
  }
}
