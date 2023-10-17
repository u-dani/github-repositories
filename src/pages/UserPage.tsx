import styled from 'styled-components'
import { Button } from '../components/form/Button'
import { ISearchUserRepositoriesResponse } from '../services/searchUserRepositories'
import { ISearchUserResponse } from '../services/searchUser'
import { Input } from '../components/form/Input'
import { ListFilter, X, HeartCrack } from 'lucide-react'
import { Loading } from '../components/Loading'
import { Pagination } from '../components/Pagination'
import { RepositoryContainer } from '../components/RepositoryContainer'
import { SearchForm } from '../components/form/SearchForm'
import { Select } from '../components/form/Select'
import { Text } from '../components/Text'
import { UserCard } from '../components/UserCard'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { searchUser } from '../services/searchUser'
import { searchUserRepositories } from '../services/searchUserRepositories'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import MediaQuery from 'react-responsive'

export const UserPage = () => {
  const { user: username } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)

  const [userData, setUserData] = useState<ISearchUserResponse | undefined>()
  const [reposData, setReposData] = useState<
    ISearchUserRepositoriesResponse[] | undefined
  >()

  const [repositoryFilterInput, setRepositoryFilterInput] = useState('')
  const [languageSelectedValue, setLanguageSelectedValue] = useState<
    string | undefined
  >()

  const filteredLanguages = [
    ...new Set(reposData?.map(repos => repos.language)),
  ].filter(lang => lang) as string[]

  filteredLanguages.unshift('Tudo')

  const filteredRepositories = reposData?.filter(repo => {
    const repoName = repo.name.toLowerCase()
    const filterInput = repositoryFilterInput.toLowerCase()

    if (!repoName.includes(filterInput)) {
      return
    }

    if (languageSelectedValue && languageSelectedValue !== repo.language) {
      return
    }

    return repo
  })

  const page = Number(searchParams.get('page')) || 1
  const reposPerPage = 20
  let repositoryArraySlice = filteredRepositories?.slice(
    reposPerPage * (page - 1),
    reposPerPage * page
  )

  repositoryArraySlice =
    repositoryArraySlice?.length === 0 ? undefined : repositoryArraySlice

  const maxPages = filteredRepositories
    ? Math.ceil(filteredRepositories.length / reposPerPage)
    : 1

  const cleanFilters = () => {
    setRepositoryFilterInput('')
    setLanguageSelectedValue(undefined)
  }

  const handleFilterInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const value = target.value.replace(/ /g, '')
    setRepositoryFilterInput(value)

    setSearchParams(params => {
      params.set('page', '1')
      return params
    })
  }

  // max 500 repositories
  const requestAllUserRepositories = async ({
    username,
    numberOfPublicRepos,
  }: {
    username: string
    numberOfPublicRepos: number
  }) => {
    const numRepos = numberOfPublicRepos > 500 ? 500 : numberOfPublicRepos

    const repos = []
    const numberOfPages = Math.ceil(numRepos / 100)

    for (let i = 1; i <= numberOfPages; i++) {
      const reposData = await searchUserRepositories({
        username,
        page: i,
        per_page: 100,
      })
      repos.push(reposData)
    }

    const reposArr = repos.reduce((arr, sub) => arr.concat(sub), [])
    return reposArr
  }

  useEffect(() => {
    async function request() {
      setIsLoading(true)
      cleanFilters()

      try {
        if (!username) {
          throw 'username is empty.'
        }

        const userData = await searchUser(username)
        setUserData(userData)

        const repos = await requestAllUserRepositories({
          username,
          numberOfPublicRepos: userData.public_repos,
        })
        setReposData(repos)
      } catch (error) {
        setUserData(undefined)
        setReposData(undefined)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    request()
  }, [username])

  return (
    <WrapperUserPage>
      <MediaQuery maxWidth={800}>
        <SearchForm
          WrapperFlexProps={{
            gap: '16px',
          }}
          SelectProps={{
            id: 'search-form',
            width: '120px',
          }}
        />
      </MediaQuery>

      {/* User Card Data Desktop */}
      <MediaQuery minWidth={801}>
        <WrapperFlex maxWidth='260px' width='40vw'>
          {isLoading ? (
            <WrapperFlex direction='column' gap='4px' height='320px'>
              <Loading />
              <Text>Buscando usuário...</Text>
            </WrapperFlex>
          ) : (
            <>
              {userData ? (
                <UserCard {...userData} />
              ) : (
                <WrapperFlex direction='column' gap='4px' height='320px'>
                  <HeartCrack size={32} style={{ color: 'tomato' }} />
                  <Text>Usuário não encontrado!</Text>
                </WrapperFlex>
              )}
            </>
          )}
        </WrapperFlex>
      </MediaQuery>

      {/* User Card Data Mobile */}
      <MediaQuery maxWidth={800}>
        <WrapperFlex>
          {isLoading ? (
            <WrapperFlex direction='column' gap='4px' height='320px'>
              <Loading />
              <Text>Buscando usuário...</Text>
            </WrapperFlex>
          ) : (
            <>
              {userData ? (
                <UserCard variant='landscape' {...userData} />
              ) : (
                <WrapperFlex direction='column' gap='4px' height='320px'>
                  <HeartCrack size={32} style={{ color: 'tomato' }} />
                  <Text>Usuário não encontrado!</Text>
                </WrapperFlex>
              )}
            </>
          )}
        </WrapperFlex>
      </MediaQuery>

      <WrapperFlex direction='column' gap='16px'>
        <Header direction='column' gap='16px'>
          <WrapperFlex gap='16px' justifyContent='space-between'>
            <MediaQuery minWidth={801}>
              <SearchForm
                WrapperFlexProps={{
                  width: '100%',
                  gap: '8px',
                }}
                SelectProps={{
                  id: 'search-form',
                  width: '130px',
                }}
              />
            </MediaQuery>

            <MediaQuery minWidth={801}>
              <ButtonFilter width='130px' height='35px'>
                <input type='checkbox' name='show-filters' id='ishow-filters' />
                <ListFilter
                  size={20}
                  strokeWidth={2.5}
                  className='button-filter-icon'
                />
                <Text weight='bold' size='sm'>
                  Filtros
                </Text>
              </ButtonFilter>
            </MediaQuery>

            <MediaQuery maxWidth={800}>
              <Text weight='bold' size='lg'>
                Filtros
              </Text>
            </MediaQuery>
          </WrapperFlex>

          <WrapperFilters gap='16px' justifyContent='start'>
            <Input
              placeholder='Busque por um repositório'
              width='100%'
              onInput={handleFilterInput}
              value={repositoryFilterInput}
              defaultValue=''
            />

            {filteredLanguages.length > 1 && (
              <Select
                id='select-filter-by-language'
                width='25%'
                placeholder='Linguagem'
                options={filteredLanguages}
                selectedValue={languageSelectedValue}
                handleSelect={lang => {
                  lang === 'Tudo'
                    ? setLanguageSelectedValue(undefined)
                    : setLanguageSelectedValue(lang)

                  setSearchParams(params => {
                    params.set('page', '1')
                    return params
                  })
                }}
              />
            )}

            <ButtonTomato height='35px' onClick={cleanFilters}>
              <WrapperFlex gap='4px'>
                <X size={20} strokeWidth={2.5} />
                <Text weight='bold' size='sm'>
                  Limpar
                </Text>
              </WrapperFlex>
            </ButtonTomato>
          </WrapperFilters>
        </Header>

        {!isLoading && (
          <>
            <RepositoryContainer repos={repositoryArraySlice} />
            {maxPages > 1 && <Pagination maxPages={maxPages} />}
          </>
        )}
      </WrapperFlex>
    </WrapperUserPage>
  )
}

const WrapperUserPage = styled(WrapperFlex)`
  align-items: start;
  padding: 40px;
  gap: 32px;

  @media screen and (max-width: 1000px) {
    padding: 24px;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const ButtonTomato = styled(Button)`
  background: tomato;
  border-color: tomato;

  &:hover:enabled,
  &:active {
    background-color: initial;
    background-position: 0 0;
    color: tomato;
  }
`

const WrapperFilters = styled(WrapperFlex)`
  border-radius: 4px;

  @media screen and (max-width: 1000px) {
    gap: 6px;

    #select-filter-by-language {
      width: 100px;
    }
  }

  @media screen and (max-width: 600px) {
    ${ButtonTomato} {
      width: fit-content;
      background: transparent;
      border-color: transparent;
      ${Text} {
        display: none;
      }
    }
  }
`

const Header = styled(WrapperFlex)`
  ${WrapperFilters} {
    display: none;
  }

  &:has(#ishow-filters:checked) ${WrapperFilters} {
    display: flex;
  }

  @media screen and (max-width: 800px) {
    gap: 8px;
    ${WrapperFilters} {
      display: flex;
    }
  }
`

const ButtonFilter = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  #ishow-filters {
    all: unset;
    position: absolute;
    inset: 0;
    cursor: pointer;
    z-index: 50;
  }

  &:has(#ishow-filters:checked) {
    background-color: transparent;
    background-position: 0 0;
    color: #58a6ff;
  }

  .button-filter-icon {
    transition: 400ms;
  }

  &:has(#ishow-filters:checked) .button-filter-icon {
    transform: rotate(180deg);
  }
`
