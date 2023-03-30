import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFormFields } from '../../store/ui/searchSlice'

export const useSearch = () => {
  const dispath = useDispatch()
  const { initialFormFields: filtro } = useSelector(state => state.search)

  const setFiltro = ({ filtro }) => {
    dispath(setFormFields({ filtro }))
  }


  const validField = () => {//valida que el campo no sea solo espcios en blanco y los quita (ya no se usa xd)
    const field = document.getElementById('filtro')
    if (field.value.trim().length === 0) {
      return false
    }else {
      return true
    }
  }

  return {
    //propiedades
    filtro,
    //metodos
    setFiltro,
    validField,
  }
}
