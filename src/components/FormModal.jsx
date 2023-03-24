import Modal from 'react-modal'
import { useModalStore } from '../hooks/modal/useModalStore'
import { FormRender } from './forms/FormRender'
import { FormUsers } from './forms/FormUsers'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
Modal.setAppElement('#root')

export const FormModal = () => {
  const { isModalOpen, modalUsers, modalClients } = useModalStore()

  return (
    <Modal
      isOpen={isModalOpen}
      /* onRequestClose = {onCloseModal} */
      style={customStyles}
      //className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <FormRender />

      {/* {modalClients === true ? <h1>Si jalo</h1> : <h1>dfgdf</h1>}
      {modalUsers ? <FormUsers /> : <>a</>} */}
    </Modal>
  )
}
