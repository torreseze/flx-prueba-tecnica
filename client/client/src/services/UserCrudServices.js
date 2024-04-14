import axios from 'axios'

const baseUrl = 'http://localhost:4000/users'

export const getUsers = async () => {
  try {
    const response = await axios.get(baseUrl);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersByNameLastname = async (value) => {
  try {
    const response = await axios.get(`${baseUrl}?q=${value}`);

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getUsersByStatus = async (value) => {
  try {
    const response = await axios.get(`${baseUrl}?status=${value}`);

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteUserById = async (id) => {
  try {
    axios.delete(`${baseUrl}/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export const postNewUser = async (userData) => {
  try {
    await axios.post(baseUrl, userData)
  }catch(error) {
    console.log(error)
  }

} 

export const putUser = async (id, userData) => {
  try {
    await axios.put(`${baseUrl}/${id}`, userData)
  }catch(error) {
    console.log(error)
  }

} 