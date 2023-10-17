import { Link } from '../components/Link'
import { SearchForm } from '../components/form/SearchForm'
import { Text } from '../components/Text'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { WrapperResponsive } from '../components/layout/WrapperResponsive'

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

      <WrapperResponsive.Provider maxWidthMobile={600}>
        <WrapperResponsive.Desktop>
          <SearchForm
            InputProps={{ height: '45px', fontSize: '1rem' }}
            SelectProps={{
              id: 'select-search-form-app',
              height: '45px',
              fontSize: '1rem',
            }}
          />
        </WrapperResponsive.Desktop>

        <WrapperResponsive.Mobile>
          <SearchForm
            SelectProps={{
              id: 'select-search-form-app',
              width: '100px',
            }}
          />
        </WrapperResponsive.Mobile>
      </WrapperResponsive.Provider>

      <Text size='sm' color='gray'>
        Projeto feito por{' '}
        <Link to='https://github.com/u-dani' target='_blank'>
          u-dani
        </Link>
      </Text>
    </WrapperFlex>
  )
}
