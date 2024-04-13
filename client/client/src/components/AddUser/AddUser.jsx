import { Button } from "antd"
import { useState } from "react"
import AddUserForm from "./AddUserForm";

const AddUser = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
    <Button onClick={handleOpen} size="large" className="add-user-button">Agregar usuario</Button>
    <AddUserForm visible={open} onCancel={handleOpen} />
    </>
  )
} 

export default AddUser