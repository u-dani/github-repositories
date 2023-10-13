import styled from 'styled-components'
import { Frown } from 'lucide-react'
import { ISearchUserRepositories } from '../services/searchUserRepositories'
import { RepositoryCard } from './RepositoryCard'
import { Text } from './Text'
import { WrapperFlex } from './layout/WrapperFlex'
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
    <>
      {repositoryArraySlice.length === 0 ? (
        <WrapperFlex direction='column' gap='4px' height='240px'>
          <Frown size={32} style={{ color: 'gold' }} />
          <Text>Não há repositórios públicos</Text>
        </WrapperFlex>
      ) : (
        <WrapperRepositories>
          {repositoryArraySlice.map(data => (
            <RepositoryCard key={data.id} {...data} />
          ))}
        </WrapperRepositories>
      )}
    </>
  )
}

const WrapperRepositories = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`
