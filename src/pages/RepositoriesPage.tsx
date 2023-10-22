import MediaQuery from 'react-responsive'
import styled from 'styled-components'
import { ButtonFilter } from '../components/form/ButtonFilter'
import { Circle } from '../components/RepositoryCard'
import { ISearchUserRepositoriesResponse } from '../services/searchUserRepositories'
import { LinkStyle } from '../components/Link'
import { Loading } from '../components/Loading'
import { Pagination } from '../components/Pagination'
import { RepositoryContainer } from '../components/RepositoryContainer'
import { SearchForm } from '../components/form/SearchForm'
import { Text } from '../components/Text'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { X, Plus, Scale, GitFork, Star } from 'lucide-react'
import { removeExtraSpacesFromString } from '../services/removeExtraSpacesFromString'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useState, useRef, useEffect, SyntheticEvent, RefObject } from 'react'
import {
  searchRepositories,
  ISearchRepositoriesProps,
  licenses,
} from '../services/searchRepositories'

interface IReposData {
  total_count: number
  items: ISearchUserRepositoriesResponse[]
}

const licensesKeys = Object.keys(licenses)

type sbProps = {
  repos?: IReposData
  query?: string
  reposNotFound?: boolean
  isLoading?: boolean
}

export const RepositoriesPage = (sb: sbProps) => {
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
  const [reposData, setReposData] = useState<IReposData | undefined>(sb.repos)

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

  const closeFilters = () => {
    const checkbox = document.querySelector<HTMLInputElement>(
      '#show-filters-repositories-page'
    )
    checkbox?.click()
  }

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

  useEffect(() => {
    if (Object.keys(sb).length === 0) {
      sb.isLoading ? setIsLoading(true) : setIsLoading(false)
      sb.reposNotFound ? setReposData(undefined) : setReposData(sb.repos)
    }
  }, [sb])

  return (
    <WrapperRepositoriesPage
      alignItems='start'
      gap='32px'
      padding='clamp(16px, 3vw, 24px)'
      style={{ color: '#dddddd' }}>
      {/* Filters Section */}
      <WrapperFilters>
        <WrapperFlex direction='column' alignItems='start' gap='16px'>
          <WrapperFlex justifyContent='space-between'>
            <Text weight='bold' size='lg'>
              Filtros
            </Text>

            <MediaQuery maxWidth='800px'>
              <button className='close-filters-button' onClick={closeFilters}>
                <X size={24} strokeWidth={2.5} />
              </button>
            </MediaQuery>
          </WrapperFlex>

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
      </WrapperFilters>

      {/* Repos Section */}
      <WrapperFlex
        direction='column'
        alignItems='start'
        gap='24px'
        width='100%'>
        <MediaQuery minWidth='901px'>
          <SearchForm
            WrapperFlexProps={{ width: '100%' }}
            SelectProps={{
              id: 'search-form-repositories-page',
              width: '150px',
              defaultSelectedValue: 'Repositórios',
            }}
          />
        </MediaQuery>

        <MediaQuery maxWidth='900px'>
          <SearchForm
            WrapperFlexProps={{ width: '100%' }}
            SelectProps={{
              id: 'search-form-repositories-page',
              width: '120px',
              defaultSelectedValue: 'Repositórios',
            }}
          />
        </MediaQuery>

        {isLoading ? (
          <WrapperFlex direction='column' gap='4px' height='300px'>
            <Loading />
            <Text>Buscando repositórios...</Text>
          </WrapperFlex>
        ) : (
          <>
            <WrapperFlex justifyContent='space-between'>
              <Text weight='bold'>
                {formatNumber(reposData?.total_count ?? 0)} resultados de{' '}
                {searchParameters.query || sb.query}
              </Text>
              <MediaQuery maxWidth={800}>
                <ButtonFilter
                  size='small'
                  id='show-filters-repositories-page'
                />
              </MediaQuery>
            </WrapperFlex>

            <RepositoryContainer repos={reposData?.items} />
            {maxPages > 1 && <Pagination maxPages={maxPages} />}
          </>
        )}
      </WrapperFlex>
    </WrapperRepositoriesPage>
  )
}

const Separator = styled.span`
  width: 100%;
  border-top: 1px solid #333;
`

const WrapperFilters = styled.div`
  position: sticky;
  top: 0;
  height: 90vh;
  overflow: hidden auto;
  min-width: 260px;
  width: 260px;
  max-width: 260px;
  padding-top: 8px;

  .close-filters-button {
    display: none;
    all: unset;
    cursor: pointer;
    align-items: center;

    &:hover {
      color: #58a6ff;
    }
  }

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-track {
    background-color: rgb(64, 64, 64);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(96, 96, 96);
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgb(112, 112, 112);
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: rgb(128, 128, 128);
  }

  /* Buttons */
  &::-webkit-scrollbar-button:single-button {
    display: block;
    background-color: rgb(64, 64, 64);
    background-size: 10px;
    background-repeat: no-repeat;
  }

  /* Up */
  &::-webkit-scrollbar-button:single-button:vertical:decrement {
    height: 12px;
    width: 16px;
    background-position: center 4px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(96, 96, 96)'><polygon points='50,00 0,50 100,50'/></svg>");
  }

  &::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(112, 112, 112)'><polygon points='50,00 0,50 100,50'/></svg>");
  }

  &::-webkit-scrollbar-button:single-button:vertical:decrement:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(128, 128, 128)'><polygon points='50,00 0,50 100,50'/></svg>");
  }

  /* Down */
  &::-webkit-scrollbar-button:single-button:vertical:increment {
    height: 12px;
    width: 16px;
    background-position: center 2px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(96, 96, 96)'><polygon points='0,0 100,0 50,50'/></svg>");
  }

  &::-webkit-scrollbar-button:single-button:vertical:increment:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(112, 112, 112)'><polygon points='0,0 100,0 50,50'/></svg>");
  }

  &::-webkit-scrollbar-button:single-button:vertical:increment:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(128, 128, 128)'><polygon points='0,0 100,0 50,50'/></svg>");
  }
`

const WrapperRepositoriesPage = styled(WrapperFlex)`
  @media screen and (max-width: 800px) {
    & ${WrapperFilters} {
      display: none;
      position: absolute;
      background-color: #222;
      padding: 24px;
      height: 100vh;
      min-width: 100vw;
      width: 100vw;
      z-index: 50;
      border-radius: 8px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:has(#show-filters-repositories-page:checked) {
      max-height: 100vh;
      overflow: hidden;
    }

    &:has(#show-filters-repositories-page:checked) ${WrapperFilters} {
      display: block;
    }
  }
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
