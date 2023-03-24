import { NavLink } from "react-router-dom"


export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <h3><span className="badge bg-secondary">nom Taller</span></h3>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

            <NavLink
              className="border-0 btn btn-secondary m-1 ps-5 pe-5"
              to="/"
            >
              <div className="row flex justify-content-center">
                <span className="material-symbols-outlined">
                  home
                </span>

              </div>
              Home
            </NavLink>

            {/* <div className="vr me-2 d-none d-lg-block"></div> */}
            <NavLink
              className="border-0 btn btn-secondary m-1"
              to="/configuraciones"
            >
              <div className="row flex justify-content-center">
                <span className="material-symbols-outlined">
                  settings
                </span>

              </div>
              configuraciones
            </NavLink>

          </ul>

          <button
            className="btn btn-secondary"

          >
            logut
          </button>

        </div>
      </div>
    </nav>
  )
}
