import { configureStore } from '@reduxjs/toolkit';
import UserCrudSlice from './UserCrudSlice/UserCrudSlice'; // Asegúrate de importar tu slice

export default configureStore({
  reducer: {
    UserCrudSlice // Puedes agregar más reducers aquí si es necesario
  },
});
