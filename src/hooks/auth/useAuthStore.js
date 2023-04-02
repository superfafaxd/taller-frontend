import { useDispatch } from "react-redux";
import appWebApi from "../../API/appWebApi";
import { login, onSetError, onSetAuthStorage, logout, checkingCredentials } from "../../store/auth/authSlice";
import { useEmpresa } from "../configuraciones/empresa/useEmpresa";


export const useAuthStore = () => {

  const dispath = useDispatch();
  const { getEmpresa } = useEmpresa()

  const onLogIn = async ({ user, pass }) => {
    try {
      const { data } = await appWebApi.post("/usuarios/login", { user, pass })
      console.log(data);
      if (!data.ok) {
        dispath(onSetError(data))
      }else{
        getEmpresa()
        dispath(login(data))
        dispath(onSetAuthStorage(data))
      }
    } catch (error) {
      console.log('error!!');
      console.log(error);
    }
  }

  const checkAuth = () =>{
    dispath(checkingCredentials())
    const auth = JSON.parse(localStorage.getItem('loading'))
    if(!auth) return dispath(logout());
    if(auth.status == 'authenticated'){
      getEmpresa()
      dispath(login(auth)) 
    }
  
  }

  return {
    //propiedades / variables
    //metodos
    onLogIn,
    checkAuth,
  }
}
