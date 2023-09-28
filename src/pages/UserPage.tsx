import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchUser } from '../services/searchUser'

export const UserPage = () => {
  const { user } = useParams()
  const [userData, setUserData] = useState()

  useEffect(() => {
    async function r() {
      const data = await searchUser(user ?? '')
      setUserData(data)
    }
    r()
  }, [user])

  return (
    <main>
      <h1>Página do usuario</h1>
    </main>
  )
}
