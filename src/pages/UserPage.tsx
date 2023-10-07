import styled from 'styled-components'
import { Button } from '../components/form/Button'
import { ISearchUserRepositories } from '../services/searchUserRepositories'
import { ISearchUserResponse } from '../services/searchUser'
import { Input } from '../components/form/Input'
import { ListFilter } from 'lucide-react'
import { RepositoryCard } from '../components/RepositoryCard'
import { SearchForm } from '../components/form/SearchForm'
import { Select } from '../components/form/Select'
import { Text } from '../components/Text'
import { UserCard } from '../components/UserCard'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { searchUser } from '../services/searchUser'
import { searchUserRepositories } from '../services/searchUserRepositories'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { X } from 'lucide-react'

export const UserPage = () => {
  const { user: username } = useParams()

  const [isLoading, setIsLoading] = useState(true)

  const [userData, setUserData] = useState<ISearchUserResponse | undefined>()
  const [reposData, setReposData] = useState<
    ISearchUserRepositories[] | undefined
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
    if (!repo.name.includes(repositoryFilterInput)) {
      return
    }

    if (languageSelectedValue && languageSelectedValue !== repo.language) {
      return
    }

    return repo
  })

  const cleanFilters = () => {
    setRepositoryFilterInput('')
    setLanguageSelectedValue(undefined)
  }

  const handleFilterInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const value = target.value.replace(/ /g, '')
    setRepositoryFilterInput(value)
  }

  useEffect(() => {
    async function request() {
      try {
        if (!username) {
          throw 'username does not exist!'
        }
        const userData = await searchUser(username)
        setUserData(userData)

        const repos = []

        const perPage = 20
        const numberOfPages = Math.ceil(userData.public_repos / perPage)

        for (let i = 1; i <= numberOfPages; i++) {
          const reposData = await searchUserRepositories({
            username,
            page: i,
            per_page: 20,
          })
          repos.push(reposData)
        }

        const reposArr = repos.reduce((arr, sub) => arr.concat(sub), [])

        setReposData(reposArr)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    request()
  }, [username])

  return (
    <WrapperFlex width='100%' alignItems='start' padding='40px' gap='24px'>
      <WrapperFlex width='360px' style={{ border: '1px solid red' }}>
        {isLoading ? (
          <span>Carregando</span>
        ) : (
          <>
            {userData ? (
              <UserCard {...userData} />
            ) : (
              <p>Usuário não encontrado</p>
            )}
          </>
        )}
      </WrapperFlex>

      <WrapperFlex direction='column' gap='16px'>
        <Header direction='column' gap='16px'>
          <WrapperFlex gap='16px' justifyContent='space-between'>
            <SearchForm
              WrapperFlexProps={{
                width: '100%',
                maxWidth: '700px',
                gap: '16px',
              }}
              SelectProps={{
                id: 'search-form',
                width: '160px',
              }}
            />
            <ButtonFilter width='100px' height='35px'>
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
          </WrapperFlex>

          <WrapperFilters
            padding='8px'
            gap='16px'
            justifyContent='start'
            id='oi'>
            <Input
              placeholder='Busque por um repositório'
              width='100%'
              onInput={handleFilterInput}
              value={repositoryFilterInput}
              defaultValue=''
            />

            {filteredLanguages.length > 1 && (
              <Select
                width='30%'
                id='select-filter-by-language'
                placeholder='Linguagem'
                options={filteredLanguages}
                selectedValue={languageSelectedValue}
                handleSelect={lang => {
                  lang === 'Tudo'
                    ? setLanguageSelectedValue(undefined)
                    : setLanguageSelectedValue(lang)
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

        <WrapperRepositories>
          {filteredRepositories?.map(data => (
            <RepositoryCard key={data.id} {...data} />
          ))}
        </WrapperRepositories>
      </WrapperFlex>
    </WrapperFlex>
  )
}

const WrapperFilters = styled(WrapperFlex)`
  background-color: #222;
  border-radius: 4px;
`

const Header = styled(WrapperFlex)`
  ${WrapperFilters} {
    display: none;
  }

  &:has(#ishow-filters:checked) ${WrapperFilters} {
    display: flex;
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

const WrapperRepositories = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`

const ButtonTomato = styled(Button)`
  background: tomato;
  border-color: tomato;

  &:hover,
  &:active {
    background-color: initial;
    background-position: 0 0;
    color: tomato;
  }
`
