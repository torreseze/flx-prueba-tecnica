import { Layout } from 'antd';


const { Header } = Layout;
const AppHeader = () => {
  return (
    <Header className='site-page-header'>
      
      <div className='logo'>
      <img src='src/assets/FlexxusLogo.png' />
      </div>
      
    </Header>
  )
}

export default AppHeader