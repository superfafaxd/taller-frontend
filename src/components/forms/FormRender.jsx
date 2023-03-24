import { useModalStore } from '../../hooks/modal/useModalStore'
import { FormAutos } from './FormAutos'
import { FormClients } from './FormClients'
import { FormSeach } from './FormSeach'
import { FormSearchCar } from './FormSearchCar'
import { FormUsers } from './FormUsers'

export const FormRender = () => {
  const { isModalOpen, modalUsers, modalClients, modalAutos, modalSearch, modalSearchCar } = useModalStore()

  if (modalClients) {
    return <FormClients />
  }else if (modalUsers) {
    return <FormUsers />
  }else if(modalAutos){
    return <FormAutos />
  }else if(modalSearch){
    return <FormSeach />
  }else if(modalSearchCar){
    return <FormSearchCar />
  }
}
