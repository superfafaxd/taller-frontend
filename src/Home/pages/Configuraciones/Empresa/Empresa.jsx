import { useSelector } from 'react-redux'
import { Back, LoadingBar, Recargar } from '../../../../components/buttons/Buttons'
import { useEmpresa } from '../../../../hooks/configuraciones/empresa/useEmpresa'
import { useForm } from '../../../../hooks/useForm'
import { HomeLayout } from '../../../../layouts/HomeLayout'

export const Empresa = () => {
  const { initialFormFields, isLoading } = useSelector((state) => state.empresa)
  const { updateEnterprice, getEmpresa } = useEmpresa()
  const {
    formState,
    representante,
    taller_nom,
    pais,
    estado,
    municipio,
    cp,
    domicilio,
    onInputChange,
  } = useForm(initialFormFields)


  const onSubmit =(event) => {
    event.preventDefault()
updateEnterprice(formState)
    //console.log(formState)
  }
  return (
    <HomeLayout>
      <Back path="/configuraciones" text="Empresa" />

      <Recargar onReload={getEmpresa} />

      <LoadingBar isLoading={isLoading} />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <form onSubmit={onSubmit}>
            <div className="form-group mb-2">
              <label className="pb-1 text-primary">
                Representante<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Representante"
                required
                autoComplete="off"
                name="representante"
                value={representante}
                onChange={onInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <label className="pb-1 text-primary">
                Nombre de el Taller<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de el Taller"
                required
                autoComplete="off"
                name="taller_nom"
                value={taller_nom}
                onChange={onInputChange}
              />
            </div>
            {/* -------------------------------------------------pais y estado------------------------ */}

            <div className="row">
              <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="pb-1 text-primary">
                  Pais<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pais"
                  required
                  autoComplete="off"
                  name="pais"
                  value={pais}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="pb-1 text-primary">
                  Estado<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Estado"
                  required
                  autoComplete="off"
                  name="estado"
                  value={estado}
                  onChange={onInputChange}
                />
              </div>
            </div>

            {/* -------------------------------------------------municipio y codigo postal------------------------ */}
            <div className="row">
              <div className="form-group col-6">
                <label className="pb-1 text-primary">
                  Municipio<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Municipio"
                  required
                  autoComplete="off"
                  name="municipio"
                  value={municipio}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group col-6">
                <label className="pb-1 text-primary">
                  Codigo Postal<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Codigo Postal"
                  required
                  autoComplete="off"
                  name="cp"
                  value={cp}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="form-group mb-2">
              <label className="pb-1 text-primary">
                Domicilio<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Domicilio"
                required
                autoComplete="off"
                name="domicilio"
                value={domicilio}
                onChange={onInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success">
                <div className="row flex justify-content-center">
                  <span className="material-symbols-outlined">done</span>
                </div>
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  )
}
