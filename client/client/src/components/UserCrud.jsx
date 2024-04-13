import { Breadcrumb, Select, Space } from "antd";
import Search from "antd/es/input/Search";
import UserList from "./UserList/UserList";
import AddUser from "./AddUser/AddUser";

const UserCrud = () => {

  const onSearch = (value) => console.log(value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  

  const options = [{value: 'active', label: 'active'}, {value: 'inactive', label: 'inactive'}];

  return (
    <div className="container">
      <Space direction="vertical" size="large" style={{width: '100%', marginLeft: '100px', marginRight: '100px'}}>
        <Breadcrumb className="breadcrum">
          <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
          <Breadcrumb.Item>Listado de Usuarios</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ display: 'flex'}}>
          <Search
            placeholder="Buscar usuarios"
            size="large"
            onSearch={onSearch}
            style={{
              width: 200
            }}
          />
          <Select 
            placeholder= "Filtrar por estado"
            size="large"
            style={{ width: 200, marginLeft: '15px' }}
            onChange={handleChange}
            options={options}
          />

          <AddUser />
        </div>


        <UserList />

      </Space>
    </div>
  );
};

export default UserCrud;
