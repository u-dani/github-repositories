import illustration404 from '/404-error.png'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/form/Button'
import { Link } from '../components/Link'
import { Text } from '../components/Text'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <WrapperFlex>
      <WrapperFlex
        direction='column'
        padding='8px'
        maxWidth='500px'
        height='100vh'>
        <WrapperFlex direction='column' style={{ flex: 1 }}>
          <img
            src={illustration404}
            alt='Imagem de um gatinho cinza com a legenda 404 Error'
            className='illustration'
            style={{ width: '80%' }}
          />

          <Text size='xxl' weight='bold' align='center'>
            Página não encontrada!
          </Text>

          <WrapperFlex margin='24px 0px 0px'>
            <Button onClick={() => navigate(-1)}>
              <WrapperFlex gap='4px'>
                <ArrowLeft strokeWidth={2.25} />
                <Text>Voltar</Text>
              </WrapperFlex>
            </Button>
          </WrapperFlex>
        </WrapperFlex>

        <Link to='https://storyset.com/web' target='_blank'>
          <Text color='gray' size='sm'>
            Web illustrations by Storyset
          </Text>
        </Link>
      </WrapperFlex>
    </WrapperFlex>
  )
}
