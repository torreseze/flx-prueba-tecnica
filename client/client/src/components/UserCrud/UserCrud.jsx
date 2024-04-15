import { Breadcrumb, Space } from "antd";


import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsersList } from "../../store/UserCrudSlice/UserCrudSlice";
import Actions from "./Actions/Actions";
import Spinner from "../Spinner";
import UserList from "./UserList/UserList";

const UserCrud = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const loadComponent = useCallback(() => {
    // Simular tiempo de espera
    setTimeout(() => {
      dispatch(getUsersList());
      setLoading(false);
    }, 700);
  }, [dispatch]); 

  useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  return (
    <div className="container">
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", marginLeft: "100px", marginRight: "100px" }}
      >
        <Breadcrumb
          className="breadcrum"
          items={[{ title: "Usuarios" }, { title: "Listado usuarios" }]}
        />

        <Actions setLoading={setLoading}/>

        {loading ? <Spinner/> : <UserList />}
      </Space>
    </div>
  );
};

export default UserCrud;
