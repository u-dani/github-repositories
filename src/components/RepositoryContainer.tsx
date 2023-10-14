import styled from 'styled-components'
import { Frown } from 'lucide-react'
import { ISearchUserRepositoriesResponse } from '../services/searchUserRepositories'
import { RepositoryCard } from './RepositoryCard'
import { Text } from './Text'
import { WrapperFlex } from './layout/WrapperFlex'

export const RepositoryContainer = ({
  repos,
}: {
  repos: ISearchUserRepositoriesResponse[] | undefined
}) => {
  return (
    <>
      {repos ? (
        <WrapperRepositories>
          {repos.map(data => (
            <RepositoryCard key={data.id} {...data} />
          ))}
        </WrapperRepositories>
      ) : (
        <WrapperFlex direction='column' gap='4px' height='240px'>
          <Frown size={32} style={{ color: 'gold' }} />
          <Text>Não há repositórios públicos</Text>
        </WrapperFlex>
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
