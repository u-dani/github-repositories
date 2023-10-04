import styled from 'styled-components'
import { Button } from '../components/form/Button'
import { ISearchUserResponse } from '../services/searchUser'
import { ListFilter } from 'lucide-react'
import { RepositoryCard } from '../components/RepositoryCard'
import { SearchForm } from '../components/form/SearchForm'
import { Text } from '../components/Text'
import { UserCard } from '../components/UserCard'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { searchUser } from '../services/searchUser'
import { searchUserRepositories } from '../services/searchUserRepositories'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ISearchUserRepositories } from '../services/searchUserRepositories'

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
`

const WrapperRepositories = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

export const UserPage = () => {
  const { user: username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<ISearchUserResponse | undefined>()
  const [reposData, setReposData] = useState<
    ISearchUserRepositories[] | undefined
  >()

  useEffect(() => {
    async function request() {
      try {
        if (!username) {
          throw 'username does not exist!'
        }
        const data = await searchUser(username)
        setUserData(data)

        const repos = await searchUserRepositories({ username })
        setReposData(repos)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    request()
  }, [username])

  return (
    <WrapperFlex width='100vw' alignItems='start' padding='40px' gap='24px'>
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
        <WrapperFlex gap='16px' justifyContent='space-between'>
          <SearchForm
            WrapperFlexProps={{ width: '100%', maxWidth: '700px' }}
            SelectProps={{
              id: 'search-form',
              width: '160px',
            }}
          />
          <ButtonFilter width='100px' height='35px'>
            <input type='checkbox' name='show-filters' id='ishow-filters' />
            <ListFilter size={20} strokeWidth={2.5} />
            <Text weight='bold' size='sm'>
              Filtros
            </Text>
          </ButtonFilter>
        </WrapperFlex>

        <WrapperRepositories>
          {reposData?.map(data => (
            <RepositoryCard key={data.id} {...data} />
          ))}
        </WrapperRepositories>
      </WrapperFlex>
    </WrapperFlex>
  )
}
