/* eslint-disable react/prop-types */
import { Button, Divider, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../store/UserCrudSlice/UserCrudSlice";

const DeleteNotification = ({ open, onCancel }) => {

  const dispatch = useDispatch()
  const store = useSelector(state => state.UserCrudSlice.selectedUser)

  const handleDelete = () => {
    dispatch(deleteUser(store.id))
    onCancel();
  }

  return (
    <Modal 
      open={open} 
      className='notification-delete'
      title="Eliminar usuario" 
      onCancel={onCancel}
      footer={[
        <Button key="cancel" type="default" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="delete" type="primary" style={{ background: '#E23336' }} onClick={handleDelete}>
        Eliminar
      </Button>
      ]}
      >
      <Divider />
      <p style={{ fontWeight: '400', fontSize: '14px', lineHeight:'22px'}}>
        ¿Está seguro que quiere eliminar el usuario
        <span style={{ color: "#E23336" }}> @{store?.username}</span>?
      </p>
      <Divider />
    </Modal>
  );
};

export default DeleteNotification;
