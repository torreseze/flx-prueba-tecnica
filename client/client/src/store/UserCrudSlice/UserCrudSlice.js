import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteUserById, getUsers, getUsersByNameLastname, getUsersByStatus, postNewUser, putUser } from '../../services/UserCrudServices'

export const getUsersList = createAsyncThunk( 'getUsers', async () => {
  const response = await getUsers()

  return response
})

export const getUsersFiltered = createAsyncThunk( 'getUsersByNameLastname', async (value) => {
  const response = await getUsersByNameLastname(value)

  return response
})

export const getUsersFilteredByStatus = createAsyncThunk( 'getUsersByStatus', async (value) => {
  const response = await getUsersByStatus(value)

  return response
})

export const deleteUser = createAsyncThunk( 'getUsersByStatus', async (id, {dispatch}) => {
  
  await deleteUserById(id)
  await dispatch(getUsersList())
})

export const createUser = createAsyncThunk( 'postNewUser', async (userData) => {
  await postNewUser(userData)
})

export const editUser = createAsyncThunk( 'putUser', async (id, userData) =>{
  await putUser(id, userData)
})


const userCrudSlice = createSlice({
  name: 'userCrud',
  initialState: {
    users: [],
    loading: false,
    selectedUser: {}
  },
  reducers: {
    selectUser(state, action) {
      state.selectedUser = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
      })
      .addCase(getUsersFiltered.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsersFiltered.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
      })
      .addCase(getUsersFilteredByStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsersFilteredByStatus.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
      })
  }
})

export const {selectUser} = userCrudSlice.actions
export default userCrudSlice.reducer