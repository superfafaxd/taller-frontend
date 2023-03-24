import { useDispatch } from "react-redux"
import { onEditService, onResetFormFieldsService } from "../../../store/home/services/useServiciosSlice"


export const useServices = () => {
    const dispath = useDispatch()

    const setFormFieldsService = (service) =>{
        dispath(onResetFormFieldsService(service))
    }

    const editServise = () =>{
      dispath(onEditService())
    }

  return {
    setFormFieldsService,
    editServise,
  }
}
