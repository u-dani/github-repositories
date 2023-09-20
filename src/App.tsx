import { Button } from './components/form/Button'
import { Input } from './components/form/Input'
import { WrapperFlex } from './components/layout/WrapperFlex'
import { Text } from './components/Text'

function App() {
  return (
    <WrapperFlex direction='column' gap='40px' height='100vh' padding='40px'>
      <Text size='xxl' align='center' weight='bold'>
        Repositórios do Github
      </Text>
      <Input
        placeholder='Digite o usuário do Github'
        textAlign='center'
        maxWidth='600px'
      />

      <Button width='160px'>Buscar</Button>
    </WrapperFlex>
  )
}

export default App
