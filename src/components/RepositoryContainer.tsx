import styled from 'styled-components'
import { ISearchUserRepositories } from '../services/searchUserRepositories'
import { RepositoryCard } from './RepositoryCard'
import { useSearchParams } from 'react-router-dom'

interface IRepositoryContainerProps {
  repos: ISearchUserRepositories[]
  perPage?: number
}

export const RepositoryContainer = ({
  repos,
  perPage,
}: IRepositoryContainerProps) => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const reposPerPage = perPage ?? 20

  const repositoryArraySlice = repos.slice(
    reposPerPage * (page - 1),
    reposPerPage * page
  )

  return (
    <WrapperRepositories>
      {repositoryArraySlice.map(data => (
        <RepositoryCard key={data.id} {...data} />
      ))}
    </WrapperRepositories>
  )
}

const WrapperRepositories = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`
