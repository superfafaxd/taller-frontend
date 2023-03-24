import { FormModal } from "../components/FormModal"
import { NavBar } from "../components/NavBar"


export const HomeLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      &nbsp; {/* separacion */}
      <div className='container' >

        {children}
        <FormModal />
      </div>
    </>
  )
}
