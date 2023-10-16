import styled from 'styled-components'
import { Circle } from '../components/RepositoryCard'
import { Text } from '../components/Text'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { X, PlusCircle, Scale, GitFork } from 'lucide-react'
import { removeExtraSpacesFromString } from '../services/removeExtraSpacesFromString'
import { useState, useRef, useEffect } from 'react'
import {
  searchRepositories,
  ISearchRepositoriesProps,
  licenses,
} from '../services/searchRepositories'
import { useSearchParams } from 'react-router-dom'
import { ISearchUserRepositoriesResponse } from '../services/searchUserRepositories'
import { RepositoryContainer } from '../components/RepositoryContainer'
import { Pagination } from '../components/Pagination'
import { SearchForm } from '../components/form/SearchForm'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { LinkStyle } from '../components/Link'

interface IReposData {
  total_count: number
  items: ISearchUserRepositoriesResponse[]
}

const licensesKeys = Object.keys(licenses)

export const RepositoriesPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search') ?? ''
  const page = Number(searchParams.get('page')) ?? 1

  const [isLoading, setIsLoading] = useState(true)
  const [reposData, setReposData] = useState<IReposData | undefined>()
  const [filters, setFilters] = useState<ISearchRepositoriesProps>({
    query,
    page,
    per_page: 20,
  })

  const languages = [
    ...new Set(reposData?.items.map(repos => repos.language)),
  ].filter(lang => lang) as string[]

  const maxPages =
    reposData?.total_count && filters.per_page
      ? Math.ceil(reposData.total_count / filters.per_page)
      : 1

  const languageInputRef = useRef<HTMLInputElement>(null)
  const forksInputRef = useRef<HTMLInputElement>(null)

  const resetPageParameter = () => {
    setSearchParams(params => {
      params.set('page', '1')
      return params
    })
  }

  const handleFilterByLanguage = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const language = target.getAttribute('data-language')

    if (language) {
      setFilters({ ...filters, language })
    }

    resetPageParameter()
  }

  const handleSubmitLanguageForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const language = removeExtraSpacesFromString(
      languageInputRef.current?.value ?? ''
    )

    if (language) {
      setFilters({ ...filters, language })
    }

    resetPageParameter()
  }

  const handleFilterByLicense = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const license = target.getAttribute('data-license')

    if (license) {
      setFilters({ ...filters, license })
    }

    resetPageParameter()
  }

  const handleFilterByForks = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const numberOfForks = target.getAttribute('data-fork')

    if (numberOfForks) {
      setFilters({ ...filters, numberOfForks })
    }

    resetPageParameter()
  }

  const handleSubmitForksForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const numberOfForks = removeExtraSpacesFromString(
      forksInputRef.current?.value ?? ''
    )

    if (numberOfForks) {
      setFilters({ ...filters, numberOfForks })
    }

    resetPageParameter()
  }

  const formatNumber = (number: number) => {
    if (number < 1000) {
      return number
    }

    if (number < 1000000) {
      const div = number / 1000
      const integer = Math.floor(div)
      const decimal = Number((div - integer).toFixed(1))
      const format = integer + decimal + 'K'
      return format
    }

    const div = number / 1000000
    const integer = Math.floor(div)
    const decimal = Number((div - integer).toFixed(1))
    const format = integer + decimal + 'M'
    return format
  }

  useEffect(() => {
    if (!query) {
      return navigate(`/`)
    }

    async function request() {
      try {
        setIsLoading(true)
        const repos = await searchRepositories({ ...filters, query, page })
        setReposData(repos)
      } catch (err) {
        setReposData(undefined)
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page, query])

  return (
    <WrapperFlex
      alignItems='start'
      padding='40px 16px'
      gap='32px'
      style={{ color: '#dddddd' }}>
      <WrapperFlex
        width='360px'
        direction='column'
        alignItems='start'
        gap='16px'>
        <Text weight='bold' size='lg'>
          Filtrar por
        </Text>

        {/* Language Filter */}
        <WrapperFlex direction='column' alignItems='start' gap='4px'>
          <Text size='sm' weight='bold' color='gray'>
            Linguagens
          </Text>

          <WrapperFlex direction='column' onChange={handleFilterByLanguage}>
            {filters.language ? (
              <ListItem>
                <WrapperFlex>
                  <WrapperFlex gap='8px' justifyContent='start'>
                    <Circle language={filters.language} />
                    <Text size='sm'>{filters.language}</Text>
                  </WrapperFlex>
                  <X
                    size={20}
                    className='close-icon'
                    onClick={() => {
                      setFilters({ ...filters, language: undefined })
                      resetPageParameter()
                    }}
                  />
                </WrapperFlex>
              </ListItem>
            ) : (
              <>
                {languages.map(lang => (
                  <ListItem>
                    <WrapperFlex gap='8px' justifyContent='start'>
                      <input
                        type='radio'
                        name='filter-language'
                        data-language={lang}
                      />
                      <Circle language={lang} />
                      <Text size='sm'>{lang}</Text>
                    </WrapperFlex>
                  </ListItem>
                ))}

                <ListItem>
                  <WrapperFlex
                    gap='8px'
                    justifyContent='start'
                    as='form'
                    onSubmit={handleSubmitLanguageForm}>
                    <button type='submit' style={{ all: 'unset' }}>
                      <WrapperFlex>
                        <PlusCircle size={20} />
                      </WrapperFlex>
                    </button>
                    <Input
                      type='text'
                      placeholder='Mais linguagens'
                      ref={languageInputRef}
                    />
                  </WrapperFlex>
                </ListItem>
              </>
            )}
          </WrapperFlex>
        </WrapperFlex>

        {/* License Filter */}
        <WrapperFlex direction='column' alignItems='start' gap='4px'>
          <Text size='sm' weight='bold' color='gray'>
            Licenças
          </Text>

          <WrapperFlex direction='column' onChange={handleFilterByLicense}>
            {filters.license ? (
              <ListItem>
                <WrapperFlex>
                  <WrapperFlex gap='8px' justifyContent='start'>
                    <Scale size={20} />
                    <Text size='sm'>{filters.license}</Text>
                  </WrapperFlex>
                  <X
                    size={20}
                    className='close-icon'
                    onClick={() => {
                      setFilters({ ...filters, license: undefined })
                      resetPageParameter()
                    }}
                  />
                </WrapperFlex>
              </ListItem>
            ) : (
              <>
                {licensesKeys.map(license => (
                  <ListItem>
                    <WrapperFlex gap='8px' justifyContent='start'>
                      <input
                        type='radio'
                        name='filter-license'
                        data-license={license}
                      />
                      <Text size='sm'>{license}</Text>
                    </WrapperFlex>
                  </ListItem>
                ))}
              </>
            )}
          </WrapperFlex>
        </WrapperFlex>

        {/* Forks Filter */}
        <WrapperFlex direction='column' alignItems='start' gap='4px'>
          <Text size='sm' weight='bold' color='gray'>
            Número de Forks
          </Text>

          <WrapperFlex direction='column' onChange={handleFilterByForks}>
            {filters.numberOfForks ? (
              <ListItem>
                <WrapperFlex>
                  <WrapperFlex gap='8px' justifyContent='start'>
                    <GitFork size={16} strokeWidth={2} />
                    <Text size='sm'>{filters.numberOfForks}</Text>
                  </WrapperFlex>
                  <X
                    size={20}
                    className='close-icon'
                    onClick={() => {
                      setFilters({ ...filters, numberOfForks: undefined })
                      resetPageParameter()
                    }}
                  />
                </WrapperFlex>
              </ListItem>
            ) : (
              <>
                <ListItem>
                  <WrapperFlex
                    gap='8px'
                    justifyContent='start'
                    as='form'
                    onSubmit={handleSubmitForksForm}>
                    <button
                      type='submit'
                      style={{ all: 'unset' }}
                      className='button-icon'>
                      <WrapperFlex>
                        <GitFork size={16} strokeWidth={2} />
                      </WrapperFlex>
                    </button>
                    <Input
                      type='text'
                      placeholder='ex: 30..50, 100'
                      ref={forksInputRef}
                    />
                  </WrapperFlex>
                </ListItem>

                <WrapperFlex
                  justifyContent='start'
                  gap='8px'
                  margin='6px 0px 0px 12px'>
                  {['<5', '50..100', '200', '>500'].map(opt => (
                    <Tag>
                      <WrapperFlex gap='8px' justifyContent='start'>
                        <input
                          type='radio'
                          name='filter-forks'
                          data-fork={opt}
                        />
                        <Text size='sm'>{opt}</Text>
                      </WrapperFlex>
                    </Tag>
                  ))}
                </WrapperFlex>
              </>
            )}
          </WrapperFlex>
        </WrapperFlex>
      </WrapperFlex>

      {/* Repos Section */}
      <WrapperFlex direction='column' alignItems='start' gap='16px'>
        <SearchForm
          WrapperFlexProps={{ width: '100%' }}
          SelectProps={{ id: 'search-form-repositories-page', width: '200px' }}
        />

        {isLoading ? (
          <WrapperFlex direction='column' gap='4px' height='80vh'>
            <Loading />
            <Text>Buscando repositórios...</Text>
          </WrapperFlex>
        ) : (
          <>
            <Text weight='bold'>
              {formatNumber(reposData?.total_count ?? 0)} resultados de {query}
            </Text>
            <RepositoryContainer repos={reposData?.items} />
            {maxPages > 1 && <Pagination maxPages={maxPages} />}
          </>
        )}
      </WrapperFlex>
    </WrapperFlex>
  )
}

const Tag = styled(LinkStyle).attrs(() => ({
  variant: 'tag',
}))`
  position: relative;

  input[type='radio'] {
    all: unset;
    position: absolute;
    inset: 0;
  }
`

const Input = styled.input`
  background: transparent;
  font-size: 0.9rem;
  padding: 4px 0px;
  border: 1px solid transparent;
  outline: none;
  color: #ddd;

  .button-icon {
    color: #a5a4a4;
  }

  &::placeholder {
    color: #a5a4a4;
    font-weight: 500;
  }

  &:focus {
    border-bottom-color: #ddd;

    &::placeholder {
      color: transparent;
    }
  }
`

const ListItem = styled.span`
  width: 100%;
  cursor: pointer;
  border-radius: 6px;
  padding: 6px 12px;
  position: relative;

  input[type='radio'] {
    all: unset;
    position: absolute;
    inset: 0;
  }

  .close-icon:hover {
    color: tomato;
  }

  &:hover {
    background-color: #333;
  }
`
