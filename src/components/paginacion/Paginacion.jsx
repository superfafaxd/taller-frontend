import { useForm } from '../../hooks/useForm'
import Swal from 'sweetalert2'
import { usePaginacion } from '../../hooks/paginacion/usePaginacion'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearch } from '../../hooks/seach/useSearch'

export const Paginacion = ({
  onSearch = () => {
    console.log('buscando pag...')
  },
  onSearchFiltro = () => {
    console.log('search filtro')
  },
  modulo = '', //pagina
}) => {
  const { initialFormFields } = useSelector((state) => state.paginacion)

  const {
    // limite,
    totalPaginas,
    limitePorPagina,
    calcularLimite,
    setFormFields,
    setCacheClientes,
    setCacheAutos,
    calcularpaginas,
    setCacheUsers
  } = usePaginacion()

  const { formState, paginaActual, onInputChange } = useForm(initialFormFields)

  const { filtro } = useSearch()

  const caseModulo = () => {
    //----------------------------------------------
    let limiteHasta = paginaActual * 10 //vuelve a calcular el limite
    let limite = `${limiteHasta - 10}`
    //-----------------------------------------------
    switch (modulo) {
      case 'clientes':
        setCacheClientes({ filtro: filtro.filtro })
        break
      case 'autos':
        console.log('autos')
        setCacheAutos({ filtro: filtro.filtro })
        break
        case 'usuarios':
          console.log('usuaros')
          setCacheUsers({ filtro: filtro.filtro })
      default:
        break
    }
    if (filtro.filtro.length == 0) {
      //console.log({ filtro, limite, limitePorPagina })
      onSearch(limite, limitePorPagina)
      console.log('sin filtro')
    } else {
      //console.log({ filtro: filtro.filtro, limite, limitePorPagina })
      onSearchFiltro({
        filtro: filtro.filtro,
        limite: limite,
        limitePorPagina: limitePorPagina,
      })
      console.log('con filtro')
    }
  }

  const onBuscarPagina = (event) => {
    event.preventDefault()

    if (totalPaginas < paginaActual || paginaActual.length <= 0) {
      const Toast = Swal.mixin({
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })

      Toast.fire({
        icon: 'error',
        title: 'pagina no valida',
      })
      return
    } else {
      //console.log(filtro.filtro)
      setFormFields({ paginaActual }) //pone en el store la pagina actual
      console.log('paginacion')
      // onSearch({ paginaActual, modulo }) //con esto busca

      caseModulo()
    }
  }

  return (
    <form onSubmit={onBuscarPagina}>
      <div className="mb-1 d-flex justify-content-center">
        <div className="col-10 col-md-5 col-lg-4 col-xl-8">
          <span className="">Paginas</span>
          <div className="input-group input-group">
            <button
              type="button"
              className="border-0 btn btn-secondary"
              onClick={onBuscarPagina}

              // disabled={isDisable}
            >
              <div className="d-flex  justify-content-between p-1">
                <span className="material-symbols-outlined">search</span>
                Buscar
              </div>
            </button>

            <input
              type="number"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              name="paginaActual"
              value={paginaActual}
              onChange={onInputChange}
            />
            <span className="input-group-text">de </span>
            <span className="input-group-text" id="inputGroup-sizing-lg">
              {totalPaginas}
            </span>
          </div>
        </div>
      </div>
    </form>
  )
}
