import { ISearchUserRepositories } from '../services/searchUserRepositories'
import { RepositoryCard } from './RepositoryCard'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import { WrapperFlex } from './layout/WrapperFlex'

interface IRepositoryContainerProps {
  repos: ISearchUserRepositories[]
}

const reposPerPage = 20

export const RepositoryContainer = ({ repos }: IRepositoryContainerProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const previousPage = () => {
    console.log('prev page')
  }

  const nextPage = () => {
    console.log('next page')
  }

  const repositoryArraySlice = repos.slice(0, reposPerPage)

  return (
    <WrapperFlex gap='24px' direction='column'>
      <WrapperRepositories>
        {repositoryArraySlice.map(data => (
          <RepositoryCard key={data.id} {...data} />
        ))}
      </WrapperRepositories>

      <WrapperFlex gap='16px'>
        <button onClick={previousPage}>Anterior</button>
        <button onClick={nextPage}>Próxima</button>
      </WrapperFlex>
    </WrapperFlex>
  )
}

const WrapperRepositories = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`
