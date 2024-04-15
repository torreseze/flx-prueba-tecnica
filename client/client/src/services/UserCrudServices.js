import axios from 'axios'

const baseUrl = 'http://localhost:4000/users'

export const getUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    
    return  response.data
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
  console.log(id, userData)
  try {
    await axios.put(`${baseUrl}/${id}`, {
      id,
      username: userData.username,
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      status: userData.status,
      age: parseInt(userData.age, 10)
    });
  }catch(error) {
    console.log(error)
  }

} 