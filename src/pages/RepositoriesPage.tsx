import styled from 'styled-components'
import { Circle } from '../components/RepositoryCard'
import { Text } from '../components/Text'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { X, PlusCircle } from 'lucide-react'
import { removeExtraSpacesFromString } from '../services/removeExtraSpacesFromString'
import { useState, useRef, useEffect } from 'react'
import {
  searchRepositories,
  ISearchRepositoriesProps,
} from '../services/searchRepositories'
import { useSearchParams } from 'react-router-dom'
import { ISearchUserRepositoriesResponse } from '../services/searchUserRepositories'
import { RepositoryContainer } from '../components/RepositoryContainer'
import { Pagination } from '../components/Pagination'
import { SearchForm } from '../components/form/SearchForm'

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Shell',
  'Kotlin',
  'SASS',
  'HTML',
]

interface IReposData {
  total_count: number
  items: ISearchUserRepositoriesResponse[]
}

export const RepositoriesPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search') ?? ''
  const page = Number(searchParams.get('page')) ?? 1

  console.log(page)

  const [isLoading, setIsLoading] = useState(true)
  const [reposData, setReposData] = useState<IReposData | undefined>()
  const [filters, setFilters] = useState<ISearchRepositoriesProps>({
    query,
    per_page: 20,
  })

  const maxPages =
    reposData?.total_count && filters.per_page
      ? Math.ceil(reposData.total_count / filters.per_page)
      : 1

  const languageInputRef = useRef<HTMLInputElement>(null)

  const handleFilterByLanguage = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const language = target.getAttribute('data-language')

    if (language) {
      setFilters({ ...filters, language })
    }
  }

  const handleSubmitLanguageForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const language = removeExtraSpacesFromString(
      languageInputRef.current?.value ?? ''
    )

    if (language) {
      setFilters({ ...filters, language })
    }
  }

  useEffect(() => {
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
      </WrapperFlex>

      <WrapperFlex direction='column' alignItems='start' gap='16px'>
        <SearchForm
          WrapperFlexProps={{ width: '100%' }}
          SelectProps={{ id: 'search-form-repositories-page', width: '200px' }}
        />

        {isLoading ? (
          <span>Buscando repositórios</span>
        ) : (
          <>
            <Text>{reposData?.total_count} resultados</Text>
            <RepositoryContainer repos={reposData?.items} />
            {maxPages > 1 && <Pagination maxPages={maxPages} />}
          </>
        )}
      </WrapperFlex>
    </WrapperFlex>
  )
}

const Input = styled.input`
  background: transparent;
  font-size: 0.9rem;
  padding: 4px 0px;
  border: 1px solid transparent;
  outline: none;
  color: #ddd;

  &::placeholder {
    color: #ddd;
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
