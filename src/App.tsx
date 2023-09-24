/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from './components/form/Button'
import { Input } from './components/form/Input'
import { WrapperFlex } from './components/layout/WrapperFlex'
import { Text } from './components/Text'

import { Select } from './components/form/Select'
import { useState } from 'react'

const options = ['Usuários', 'Repositórios']

function App() {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    options[0]
  )

  return (
    <WrapperFlex direction='column' gap='40px' height='100vh' padding='40px'>
      <Text size='xxl' align='center' weight='bold'>
        Repositórios do Github
      </Text>

      <WrapperFlex gap='8px'>
        <Select
          width='145px'
          height='45px'
          options={options}
          selectedValue={selectedValue}
          handleSelect={value => {
            setSelectedValue(value)
          }}
        />

        <Input
          placeholder={
            selectedValue === 'Usuários'
              ? 'Digite o usuário do Github'
              : 'Digite o nome do repositório'
          }
          maxWidth='400px'
          height='45px'
          padding='10px 12px'
          fontSize='1rem'
        />
      </WrapperFlex>

      <Button width='160px'>Buscar</Button>
    </WrapperFlex>
  )
}

export default App
