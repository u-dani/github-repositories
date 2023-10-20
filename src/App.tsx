import { Outlet } from 'react-router-dom'
import { WrapperFlex } from './components/layout/WrapperFlex'

function App() {
  return (
    <WrapperFlex>
      <Outlet />
    </WrapperFlex>
  )
}

export default App
