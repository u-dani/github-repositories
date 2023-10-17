import MediaQuery from 'react-responsive'
import { Link } from '../components/Link'
import { SearchForm } from '../components/form/SearchForm'
import { Text } from '../components/Text'
import { WrapperFlex } from '../components/layout/WrapperFlex'

export const HomePage = () => {
  return (
    <WrapperFlex
      direction='column'
      gap='40px'
      height='100vh'
      padding='40px'
      maxWidth='700px'>
      <Text as='h1' size='xxl' align='center' weight='bold'>
        Repositórios do Github
      </Text>

      <MediaQuery minWidth={600}>
        <SearchForm
          InputProps={{ height: '45px', fontSize: '1rem' }}
          SelectProps={{
            id: 'select-search-form-app',
            height: '45px',
            fontSize: '1rem',
          }}
        />
      </MediaQuery>

      <MediaQuery maxWidth={599}>
        <SearchForm
          SelectProps={{
            id: 'select-search-form-app',
            width: '100px',
          }}
        />
      </MediaQuery>

      <Text size='sm' color='gray'>
        Projeto feito por{' '}
        <Link to='https://github.com/u-dani' target='_blank'>
          u-dani
        </Link>
      </Text>
    </WrapperFlex>
  )
}
