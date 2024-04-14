
import './App.css'
import AppHeader from './components/AppHeader';
import UserCrud from './components/UserCrud/UserCrud';
import { Provider } from 'react-redux'
import store from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <AppHeader />
        <UserCrud />
      </Provider> 
    </>
  )
}

export default App
