import { Outlet } from 'react-router-dom'
import { WrapperFlex } from './components/layout/WrapperFlex'

function App() {
  return (
    <WrapperFlex>
      <WrapperFlex maxWidth='1300px'>
        <Outlet />
      </WrapperFlex>
    </WrapperFlex>
  )
}

export default App
