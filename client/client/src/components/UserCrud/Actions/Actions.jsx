/* eslint-disable react/prop-types */
import { Select } from "antd";
import Search from "antd/es/input/Search";
import { useDispatch } from "react-redux";
import {
  getUsersFiltered,
  getUsersFilteredByStatus,
  getUsersList,
} from "../../../store/UserCrudSlice/UserCrudSlice";
import AddUser from "../AddUser/AddUser";

const Actions = ({ setLoading }) => {
  const dispatch = useDispatch();

  const handleSearchByName = (value) => {
    dispatch(getUsersFiltered(value));
  };

  const handleSearchByStatus = (value) => {
    dispatch(getUsersFilteredByStatus(value));
  };

  const onSearch = (value) => {
    setLoading(true)
    setTimeout(() => {
      handleSearchByName(value);
      setLoading(false)
    }, 500); 

  };
  
  const handleChange = (value) => {
    setLoading(true)
    setTimeout(() => {
      if (value) {
        handleSearchByStatus(value);
      } else {
        dispatch(getUsersList());
      }
      setLoading(false)
    }, 500); 
  };

  const options = [
    { value: "active", label: "active" },
    { value: "inactive", label: "inactive" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Search
        placeholder="Buscar usuarios"
        size="large"
        onSearch={onSearch}
        style={{
          width: 290,
        }}
        allowClear
      />
      <Select
        placeholder="Filtrar por estado"
        size="large"
        style={{ width: 210, marginLeft: "15px" }}
        onChange={handleChange}
        options={options}
        allowClear
      />

      <AddUser />
    </div>
  );
};

export default Actions;
