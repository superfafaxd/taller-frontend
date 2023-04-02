import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import appWebApi from '../../../API/appWebApi';
import {onloading, onLoadingDataEnterprice, setFormFields } from '../../../store/configuraciones/empresa/useEmpresaSlice';


export const useEmpresa = () => {
   const dispath = useDispatch()

    const getEmpresa = async() =>{
        try {
            dispath(onloading())
            const { data } = await appWebApi.get('/empresa/getEmpresa');
            //dispath(onLoadingDataEnterprice(data.results))
            setFormFieldsEnterprice(data.results[0])
        } catch (error) {
            console.log('error!!');
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
            return
        }
    }

    const updateEnterprice = async ({ representante, taller_nom, pais, estado, municipio, cp, domicilio,}) =>{
        try {
            dispath(onloading())
            const { data } = await appWebApi.put('/empresa/UpdateEmpresa', {
                representante,
                taller_nom,
                pais,
                estado,
                municipio,
                cp,
                domicilio,
            });
            if(data.ok) {
                getEmpresa()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Auto Actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data
                })
            }
        } catch (error) {
            console.log('error!!');
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
            return
        }
    }

    const setFormFieldsEnterprice = (formFiels) =>{
        dispath(setFormFields(formFiels))
    }
  return {
    getEmpresa,
    updateEnterprice,
  }
}
