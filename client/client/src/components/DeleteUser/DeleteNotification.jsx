/* eslint-disable react/prop-types */
import { Button, Divider, Modal } from "antd";

const DeleteNotification = ({ open, userData, onCancel }) => {
  return (
    <Modal 
      open={open} 
      title="Eliminar usuario" 
      onCancel={onCancel}
      footer={[
        <Button key="cancel" type="default" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="delete" type="primary" style={{ background: '#E23336' }} onClick={() => {console.log('El usuario con este id ha sido eliminado: ', userData?.id)}}>
        Eliminar
      </Button>
      ]}
      >
      <Divider />
      <p style={{ fontWeight: '400', fontSize: '14px', lineHeight:'22px'}}>
        ¿Está seguro que quiere eliminar el usuario
        <span style={{ color: "#E23336" }}> @{userData?.username}</span>?
      </p>
      <Divider />
    </Modal>
  );
};

export default DeleteNotification;
