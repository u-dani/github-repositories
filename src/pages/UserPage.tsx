import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchUser } from '../services/searchUser'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { ISearchUserResponse } from '../services/searchUser'
import { UserCard } from '../components/UserCard'

export const UserPage = () => {
  const { user: username } = useParams()
  const [userData, setUserData] = useState<ISearchUserResponse | undefined>()

  useEffect(() => {
    async function requestUser() {
      try {
        if (!username) {
          throw 'username does not exist'
        }
        const data = await searchUser(username)
        setUserData(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    requestUser()
  }, [username])

  return (
    <WrapperFlex as='main'>
      <WrapperFlex maxWidth='400px'>
        {userData ? <UserCard {...userData} /> : <p>Carregando o usuário</p>}
      </WrapperFlex>
    </WrapperFlex>
  )
}
