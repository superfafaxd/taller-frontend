import { useAuthStore } from '../../hooks/auth/useAuthStore';
import { useForm } from '../../hooks/useForm'
import './styles.css'

const initialFormFields = {
  user: 'rafa',
  pass: '123456'
}

export const LoginPage = () => {

  const {formState, user, pass, onInputChange} = useForm(initialFormFields);
  const { onLogIn } = useAuthStore();

  const onSubmit = (event) =>{
    event.preventDefault()
    onLogIn( {user: user, pass: pass} )
    console.log(formState);
  }
  return (

    <div className='container login-container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-6 login-form rounded-1 center'>
          <h3 className='text-center'>Login</h3>
        
          <form onSubmit={onSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre de Usuario'
                required
                autoComplete='off'
                name='user'
                value={user}
                onChange={onInputChange}
              />

            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                required
                name='pass'
                value={pass}
                onChange={onInputChange}
              />
            </div>

            <div className="d-grip gap-2" >
              <input
                type='submit'
                className="col-12 btn btn-secondary btnSubmit d-flex justify-content-center"
                value="Login"
              />
            </div>

          </form>

        </div>
      </div>
    </div>

  )
}
