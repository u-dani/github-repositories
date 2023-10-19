/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components'
import { Circle } from '../components/RepositoryCard'
import { Text } from '../components/Text'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { X, Plus, Scale, GitFork, Star } from 'lucide-react'
import { removeExtraSpacesFromString } from '../services/removeExtraSpacesFromString'
import { useState, useRef, useEffect, SyntheticEvent, RefObject } from 'react'
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

  const topic = searchParams.get('topic')
    ? [
        ...new Set(
          decodeURIComponent(searchParams.get('topic') ?? '')
            .split(' ')
            .filter(topic => topic)
        ),
      ]
    : undefined

  const searchParameters: ISearchRepositoriesProps = {
    query: searchParams.get('search') || '',
    page: Number(searchParams.get('page')) || 1,
    language: searchParams.get('language') || undefined,
    license: searchParams.get('license') || undefined,
    topic: topic,
    forks: searchParams.get('forks') || undefined,
    stars: searchParams.get('stars') || undefined,
    per_page: 20,
  }

  const [isLoading, setIsLoading] = useState(true)
  const [reposData, setReposData] = useState<IReposData | undefined>()

  const languages = [
    ...new Set(reposData?.items.map(repos => repos.language)),
  ].filter(lang => lang) as string[]

  const maxPages =
    reposData?.total_count && searchParameters.per_page
      ? Math.ceil(reposData.total_count / searchParameters.per_page)
      : 1

  const languageInputRef = useRef<HTMLInputElement>(null)
  const topicInputRef = useRef<HTMLInputElement>(null)
  const forksInputRef = useRef<HTMLInputElement>(null)
  const starsInputRef = useRef<HTMLInputElement>(null)

  const updateSearchParameter = (
    key: keyof typeof searchParameters,
    value: string
  ) => {
    searchParams.set(key, value)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const deleteSearchParameter = (key: keyof typeof searchParameters) => {
    searchParams.delete(key)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const handleFilter = ({
    event,
    dataAttr,
    searchParametersKey: key,
  }: {
    event: SyntheticEvent
    dataAttr: string
    searchParametersKey: keyof typeof searchParameters
  }) => {
    const target = event.target as HTMLInputElement
    const data = target.getAttribute(`data-${dataAttr}`)

    if (data) {
      updateSearchParameter(key, data)
    }
  }

  const handleSubmitFilter = ({
    event,
    ref,
    searchParametersKey: key,
  }: {
    event: SyntheticEvent
    ref: RefObject<HTMLInputElement>
    searchParametersKey: keyof typeof searchParameters
  }) => {
    event.preventDefault()
    const valueRef = removeExtraSpacesFromString(ref.current?.value ?? '')

    if (valueRef) {
      updateSearchParameter(key, valueRef)
    }
  }

  const handleSubmitTopicFilter = (e: SyntheticEvent) => {
    e.preventDefault()
    const topic = topicInputRef.current?.value.replace(/ /g, '')

    if (topic && topicInputRef.current) {
      const topicArr = searchParameters.topic ?? []
      topicArr.push(topic)

      updateSearchParameter('topic', topicArr.join(' '))
      topicInputRef.current.value = ''
    }
  }

  const removeTopic = (topic: string) => {
    console.log('topic ', topic)

    const filteredTopic = searchParameters.topic?.filter(data => data !== topic)

    if (!filteredTopic || filteredTopic.length === 0) {
      deleteSearchParameter('topic')
      return
    }

    updateSearchParameter('topic', filteredTopic.join(' '))
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
    if (!searchParameters.query) {
      return navigate(`/`)
    }

    async function request() {
      try {
        setIsLoading(true)
        const repos = await searchRepositories({
          ...searchParameters,
        })
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
  }, [searchParams])

  return (
    <WrapperFlex
      alignItems='start'
      padding='40px 16px'
      gap='32px'
      style={{ color: '#dddddd' }}>
      <WrapperFlex
        width='300px'
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

          <WrapperFlex
            direction='column'
            onChange={e => {
              handleFilter({
                event: e,
                dataAttr: 'language',
                searchParametersKey: 'language',
              })
            }}>
            {searchParameters.language ? (
              <ListItem>
                <WrapperFlex>
                  <WrapperFlex gap='8px' justifyContent='start'>
                    <Circle language={searchParameters.language} />
                    <Text size='sm'>{searchParameters.language}</Text>
                  </WrapperFlex>
                  <X
                    size={20}
                    className='close-icon'
                    onClick={() => {
                      deleteSearchParameter('language')
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
                    onSubmit={e =>
                      handleSubmitFilter({
                        event: e,
                        ref: languageInputRef,
                        searchParametersKey: 'language',
                      })
                    }>
                    <button type='submit' style={{ all: 'unset' }}>
                      <WrapperFlex>
                        <Plus size={20} />
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

        <Separator />

        {/* License Filter */}
        <WrapperFlex direction='column' alignItems='start' gap='4px'>
          <Text size='sm' weight='bold' color='gray'>
            Licenças
          </Text>

          <WrapperFlex
            direction='column'
            onChange={e => {
              handleFilter({
                event: e,
                dataAttr: 'license',
                searchParametersKey: 'license',
              })
            }}>
            {searchParameters.license ? (
              <ListItem>
                <WrapperFlex>
                  <WrapperFlex gap='8px' justifyContent='start'>
                    <Scale size={20} />
                    <Text size='sm'>{searchParameters.license}</Text>
                  </WrapperFlex>
                  <X
                    size={20}
                    className='close-icon'
                    onClick={() => {
                      deleteSearchParameter('license')
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

        <Separator />

        {/* Topic Filter */}
        <WrapperFlex direction='column' alignItems='start' gap='4px'>
          <Text size='sm' weight='bold' color='gray'>
            Tópicos
          </Text>

          <WrapperFlex direction='column'>
            <WrapperFlex margin='0px 0px 6px 0px'>
              <ListItem>
                <WrapperFlex
                  gap='8px'
                  justifyContent='start'
                  as='form'
                  onSubmit={handleSubmitTopicFilter}>
                  <button type='submit' style={{ all: 'unset' }}>
                    <WrapperFlex>
                      <Plus size={20} />
                    </WrapperFlex>
                  </button>
                  <Input
                    type='text'
                    placeholder='ex: game, javascript'
                    ref={topicInputRef}
                  />
                </WrapperFlex>
              </ListItem>
            </WrapperFlex>

            {searchParameters.topic?.map(topic => (
              <ListItem key={topic}>
                <WrapperFlex>
                  <WrapperFlex gap='8px' justifyContent='start'>
                    <Text size='sm'>{topic}</Text>
                  </WrapperFlex>
                  <X
                    size={20}
                    className='close-icon'
                    onClick={() => {
                      removeTopic(topic)
                    }}
                  />
                </WrapperFlex>
              </ListItem>
            ))}
          </WrapperFlex>
        </WrapperFlex>

        <Separator />

        {/* Forks Filter */}
        <WrapperFlex direction='column' alignItems='start' gap='4px'>
          <Text size='sm' weight='bold' color='gray'>
            Número de Forks
          </Text>

          <WrapperFlex
            direction='column'
            onChange={e => {
              handleFilter({
                event: e,
                dataAttr: 'forks',
                searchParametersKey: 'forks',
              })
            }}>
            {searchParameters.forks ? (
              <ListItem>
                <WrapperFlex>
                  <WrapperFlex gap='8px' justifyContent='start'>
                    <GitFork size={16} strokeWidth={2} />
                    <Text size='sm'>{searchParameters.forks}</Text>
                  </WrapperFlex>
                  <X
                    size={20}
                    className='close-icon'
                    onClick={() => {
                      deleteSearchParameter('forks')
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
                    onSubmit={e => {
                      handleSubmitFilter({
                        event: e,
                        ref: forksInputRef,
                        searchParametersKey: 'forks',
                      })
                    }}>
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
                  wrap
                  margin='6px 0px 0px 12px'>
                  {['<5', '50..100', '200', '>500'].map(opt => (
                    <Tag>
                      <WrapperFlex gap='8px' justifyContent='start'>
                        <input
                          type='radio'
                          name='filter-forks'
                          data-forks={opt}
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

        <Separator />

        {/* Stars Filter */}
        <WrapperFlex direction='column' alignItems='start' gap='4px'>
          <Text size='sm' weight='bold' color='gray'>
            Número de Estrelas
          </Text>

          <WrapperFlex
            direction='column'
            onChange={e => {
              handleFilter({
                event: e,
                dataAttr: 'stars',
                searchParametersKey: 'stars',
              })
            }}>
            {searchParameters.stars ? (
              <ListItem>
                <WrapperFlex>
                  <WrapperFlex gap='8px' justifyContent='start'>
                    <Star size={16} />
                    <Text size='sm'>{searchParameters.stars}</Text>
                  </WrapperFlex>
                  <X
                    size={20}
                    className='close-icon'
                    onClick={() => {
                      deleteSearchParameter('stars')
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
                    onSubmit={e => {
                      handleSubmitFilter({
                        event: e,
                        ref: starsInputRef,
                        searchParametersKey: 'stars',
                      })
                    }}>
                    <button
                      type='submit'
                      style={{ all: 'unset' }}
                      className='button-icon'>
                      <WrapperFlex>
                        <Star size={16} />
                      </WrapperFlex>
                    </button>
                    <Input
                      type='text'
                      placeholder='ex: 30..50, 100'
                      ref={starsInputRef}
                    />
                  </WrapperFlex>
                </ListItem>

                <WrapperFlex
                  justifyContent='start'
                  gap='8px'
                  wrap
                  margin='6px 0px 0px 12px'>
                  {['0..100', '200', '<200', '>500', '>1000'].map(opt => (
                    <Tag>
                      <WrapperFlex gap='8px' justifyContent='start'>
                        <input
                          type='radio'
                          name='filter-stars'
                          data-stars={opt}
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
          SelectProps={{
            id: 'search-form-repositories-page',
            width: '150px',
            defaultSelectedValue: 'Repositórios',
          }}
        />

        {isLoading ? (
          <WrapperFlex direction='column' gap='4px' height='80vh'>
            <Loading />
            <Text>Buscando repositórios...</Text>
          </WrapperFlex>
        ) : (
          <>
            <Text weight='bold'>
              {formatNumber(reposData?.total_count ?? 0)} resultados de{' '}
              {searchParameters.query}
            </Text>
            <RepositoryContainer repos={reposData?.items} />
            {maxPages > 1 && <Pagination maxPages={maxPages} />}
          </>
        )}
      </WrapperFlex>
    </WrapperFlex>
  )
}

const Separator = styled.span`
  width: 100%;
  border-top: 1px solid #333;
`

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
