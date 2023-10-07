import { WrapperFlex } from './layout/WrapperFlex'
import { useSearchParams } from 'react-router-dom'

export const Pagination = ({ maxPages }: { maxPages?: number }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1

  const previousPage = () => {
    const newPage = (page === 1 ? 1 : page - 1).toString()
    setSearchParams(params => {
      params.set('page', newPage)
      return params
    })
  }

  const nextPage = () => {
    const newPage = (page + 1).toString()
    setSearchParams(params => {
      params.set('page', newPage)
      return params
    })
  }
  return (
    <WrapperFlex gap='16px'>
      <button onClick={previousPage} disabled={page > 1 ? false : true}>
        Anterior
      </button>
      <button
        onClick={nextPage}
        disabled={maxPages && page < maxPages ? false : true}>
        Próxima
      </button>
    </WrapperFlex>
  )
}
