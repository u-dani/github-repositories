import { useState } from 'react'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { Text } from '../components/Text'
import { Message } from '../components/Message'
import { IMessageProps } from '../components/Message'
import { SearchForm } from '../components/form/SearchForm'
import { Link } from '../components/Link'

export const HomePage = () => {
  const [messageData, setMessageData] = useState<IMessageProps>({
    message: 'Mensagem aqui :D',
    state: 'error',
    show: false,
    handleClose: () => {
      setMessageData({ ...messageData, show: false })
    },
    timeOut: 3000,
  })

  const handleErrorForm = (message: string) => {
    setMessageData({ ...messageData, message: message, show: true })
  }
  return (
    <WrapperFlex
      direction='column'
      gap='40px'
      height='100vh'
      padding='40px'
      width='100%'
      maxWidth='800px'
      position='relative'>
      <Message {...messageData} />

      <Text as='h1' size='xxl' align='center' weight='bold'>
        Repositórios do Github
      </Text>

      <SearchForm
        handleError={handleErrorForm}
        InputProps={{ height: '45px', fontSize: '1rem' }}
        SelectProps={{
          id: 'select-search-form-app',
          height: '45px',
          fontSize: '1rem',
        }}
      />

      <Text size='sm' color='gray'>
        Projeto feito por{' '}
        <Link to='https://github.com/u-dani' target='_blank'>
          u-dani
        </Link>
      </Text>
    </WrapperFlex>
  )
}
