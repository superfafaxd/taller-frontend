import React, { useState } from 'react'
import { useProducts } from '../../../../hooks/home/products/useProducts'

export const Product = () => {
  const { showForm, showFormAddProduct } = useProducts()
  const onAdd = () => {
    showFormAddProduct()
    console.log('campos habilitados')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    showFormAddProduct() //pone de nuevo en false a showForm
  }
  const onCancel = () => {
    showFormAddProduct() //pone de nuevo en false a showForm
  }

  return (
    <div>
      <div className="d-flex justify-content-star gap-2">
        <h4>Detalles de Servicio</h4>
        <div className="d-flex  justify-content-between">
          <button
            type="button"
            className="border-0 btn btn-danger m-1"
            //onClick={onCancel}
          >
            <div className="d-flex  justify-content-between">
              <span className="material-symbols-outlined">search</span>
              <span className="d-none d-sm-block"> Buscar</span>
            </div>
          </button>
        </div>
        {!showForm ? (
         /*  <button className="btn btn-success btn-sm" onClick={onAdd}>
            <span className="material-symbols-outlined">add</span>
          </button> */

           <div className="d-flex  justify-content-between animate__animated animate__fadeInLeft">
           <button
             type="button"
             className="border-0 btn btn-success m-1"
             onClick={onAdd}
           >
             <div className="d-flex  justify-content-between">
             <span className="material-symbols-outlined">add</span>
             </div>
           </button>
         </div>
        ) : (
          <></>
        )}

  
      </div>
      {showForm ? (
        <form
          onSubmit={onSubmit}
          className="animate__animated animate__fadeInDown"
        >
          <div className="">
            <div className="form-check form-switch ">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label" /* for="flexSwitchCheckDefault" */
              >
                Guardar como Producto
              </label>
            </div>
            <div className="row">
              <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 col-6 form-group">
                <label className="text-primary">
                  Cantidad<span className="text-danger">*</span>
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Cantidad"
                  required
                  // disabled={!editAllData}
                  autoComplete="off"
                  name="cantidad"
                  // value={cliente}
                  // onChange={onInputChange}
                />
              </div>

              <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 col-6 form-group">
                <label className="text-primary">
                  Precio<span className="text-danger">*</span>
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio"
                  required
                  // disabled={!editAllData}
                  autoComplete="off"
                  name="precio"
                  // value={cliente}
                  // onChange={onInputChange}
                />
              </div>
              <div className="col-xl-6 col-lg-10 col-md-9 col-sm-9 col-12 form-group">
                <label className="text-primary">
                Descripcion<span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Descripcion"
                  required
                  // disabled={!editAllData}
                  autoComplete="off"
                  name="descripcion"
                  // value={cliente}
                  // onChange={onInputChange}
                />
              </div>
              <div className="pt-3 col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
                <button
                  type="button"
                  className="m-0 btn btn-danger"
                  onClick={onCancel}
                >
                  <span className="material-symbols-outlined">cancel</span>
                </button>

                <button
                  type="submit"
                  className="m-0 btn btn-success"
                  //onClick={onCancel}
                >
                  <span className="material-symbols-outlined">done</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <></>
      )}
    </div>
  )
}
