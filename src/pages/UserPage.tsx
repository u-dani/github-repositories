import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchUser } from '../services/searchUser'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { ISearchUserResponse } from '../services/searchUser'
import { UserCard } from '../components/UserCard'
import { SearchForm } from '../components/form/SearchForm'
import { ListFilter } from 'lucide-react'
import { Button } from '../components/form/Button'
import { Text } from '../components/Text'
import styled from 'styled-components'

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

export const UserPage = () => {
  const { user: username } = useParams()
  const [userData, setUserData] = useState<ISearchUserResponse | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function requestUser() {
      try {
        if (!username) {
          throw 'username does not exist!'
        }
        const data = await searchUser(username)
        setUserData(data)

        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    requestUser()
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

      <WrapperFlex
        gap='16px'
        width='100%'
        justifyContent='space-between'
        style={{ background: '#333' }}>
        <SearchForm
          WrapperFlexProps={{ width: '100%', maxWidth: '700px' }}
          InputProps={{ height: '40px', fontSize: '0.875rem' }}
          SelectProps={{ height: '40px', fontSize: '0.875rem', width: '160px' }}
        />
        <ButtonFilter width='120px' height='40px'>
          <input type='checkbox' name='show-filters' id='ishow-filters' />
          <ListFilter size={20} strokeWidth={2.5} />
          <Text weight='bold' size='sm'>
            Filtros
          </Text>
        </ButtonFilter>
      </WrapperFlex>
    </WrapperFlex>
  )
}
