import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useClientes } from '../hooks/home/useClientes'
import { usePaginacion } from '../hooks/paginacion/usePaginacion'
import { useSearch } from '../hooks/seach/useSearch'
import { useForm } from '../hooks/useForm'

//const initialFormFields = {filtro: ''}

export const SearchComponent = ({
  onSearch = () => {
    console.log('buscando...')
  },
  onReload = () => {
    console.log('reset...')
  },
  onSetCache = () => {
    console.log('set cache')
  },
  text = 'Filtro por Nombre/ID',
  // resetTable = () => {},
  // calcularPagina = () => {},
  // modulo = '',
  // resetLocalStorage = () =>{}
}) => {
  const { initialFormFields } = useSelector((state) => state.search)
  const { setFiltro, validField } = useSearch()
  const { formState, filtro, onInputChange } = useForm(initialFormFields)
  const [isDisable, setIsDisable] = useState(true)

  const {
    limite,
    limitePorPagina,
    resetLimite,
    resetFormFields,
    setCacheClientes,
  } = usePaginacion()

  useEffect(() => {
    if (filtro.length >= 1) {
      setIsDisable(false)
    } else {
      setIsDisable(true)
    }
  }, [filtro])

  const filtrar = (event) => {
    event.preventDefault()
    const filtroTrim = filtro.trim()
    if (filtroTrim.length >= 1) {
      resetFormFields() //resetea la paginacion
      setFiltro({filtro: filtroTrim})
      onSetCache({filtro: filtroTrim})

      // //console.log({filtro,  limite : 0, limitePorPagina})
       onSearch({filtro: filtroTrim,  limite: 0, limitePorPagina})
    } else {
      onReload()
    }
  }

  return (
    <form onSubmit={filtrar}>
      <div className="d-flex form-group mb-2 gap-2">
        <input
          type="text"
          className=" form-control"
          placeholder={text}
          // required
          autoComplete="off"
          id="filtro"
          name="filtro"
          value={filtro}
          onChange={onInputChange}
        />

        <button
          type="button"
          className="border-0 btn btn-secondary"
          onClick={filtrar}
          disabled={isDisable}
        >
          <div className="d-flex  justify-content-between p-1">
            <span className="material-symbols-outlined">search</span>
            Buscar
          </div>
        </button>
      </div>
    </form>
  )
}
