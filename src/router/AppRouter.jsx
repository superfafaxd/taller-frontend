import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { CheckingAuth } from '../components/CheckingAuth'
import { HomeRoutes } from '../Home/routes/HomeRoutes'
import { useAuthStore } from '../hooks/auth/useAuthStore'

export const AppRouter = () => {
  const { status, errorMessage } = useSelector(state => state.auth)
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [status])

  if (status === 'checking') {
    return (
      <CheckingAuth />
    )
  }
  return (
    <>
      {/* {
        (errorMessage != null)
          ?
          <div class="alert alert-danger" role="alert">
            <h5 className='text-center '> {errorMessage} </h5>
          </div>
          : <div></div>
      } */}
      <Routes>
        {
          (status === 'not-authenticated')
            ? (
              <>
                <Route path='/auth/*' element={<AuthRoutes />} />
                <Route path='/*' element={<Navigate to='/auth/login' />} />
              </>
            )
            :
            (
              <>
                <Route path='/*' element={<HomeRoutes />} />
                <Route path='/*' element={<Navigate to='/' />} />
              </>
            )
        }


      </Routes>
    </>
  )
}
