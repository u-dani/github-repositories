import { useState, useRef, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from './components/form/Button'
import { Input } from './components/form/Input'
import { WrapperFlex } from './components/layout/WrapperFlex'
import { Text } from './components/Text'
import { Select } from './components/form/Select'

import { removeExtraSpacesFromString } from './services/removeExtraSpacesFromString'
import { Message } from './components/Message'
import { IMessageProps } from './components/Message'

const options = ['Usuários', 'Repositórios']

function App() {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    options[0]
  )
  const navigate = useNavigate()

  const [messageData, setMessageData] = useState<IMessageProps>({
    message: 'Mensagem aqui :D',
    state: 'error',
    show: false,
    handleClose: () => {
      setMessageData({ ...messageData, show: false })
    },
    timeOut: 3000,
  })

  const searchInputRef = useRef<HTMLInputElement>(null)

  const submitSearch = (e: SyntheticEvent) => {
    e.preventDefault()

    const searchInputValue = removeExtraSpacesFromString(
      searchInputRef.current?.value ?? ''
    )

    if (!searchInputValue || searchInputValue.length < 3) {
      setMessageData({
        ...messageData,
        show: true,
        message: 'A busca precisa ter no mínimo 3 caracteres.',
      })
      return
    }

    if (selectedValue === 'Usuários') {
      navigate(`usuario/${searchInputValue}`)
    } else if (selectedValue === 'Repositórios') {
      navigate(`repositorios?search=${searchInputValue}`)
    }
  }

  return (
    <WrapperFlex
      direction='column'
      gap='40px'
      height='100vh'
      padding='40px'
      width='100vw'
      maxWidth='800px'
      position='relative'>
      <Message {...messageData} />

      <Text as='h1' size='xxl' align='center' weight='bold'>
        Repositórios do Github
      </Text>

      <WrapperFlex
        gap='40px'
        direction='column'
        as='form'
        onSubmit={submitSearch}>
        <WrapperFlex gap='8px'>
          <Select
            width='130px'
            height='45px'
            options={options}
            selectedValue={selectedValue}
            handleSelect={value => {
              setSelectedValue(value)
            }}
          />

          <Input
            ref={searchInputRef}
            placeholder={
              selectedValue === 'Usuários'
                ? 'Digite o usuário do Github'
                : 'Digite o nome do repositório'
            }
            maxWidth='400px'
            height='45px'
            padding='10px 12px'
            fontSize='1rem'
            required
          />
        </WrapperFlex>

        <Button width='160px' type='submit'>
          Buscar
        </Button>
      </WrapperFlex>
    </WrapperFlex>
  )
}

export default App
