import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from './form/Button'
import { Text } from './Text'
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
      <Button
        onClick={previousPage}
        disabled={page > 1 ? false : true}
        width='90px'
        height='35px'>
        <WrapperFlex gap='4px'>
          <ArrowLeft size={16} strokeWidth={2.25} />
          <Text weight='bold' size='xs'>
            Anterior
          </Text>
        </WrapperFlex>
      </Button>
      <Button
        onClick={nextPage}
        disabled={!maxPages ? false : maxPages > page ? false : true}
        width='90px'
        height='35px'>
        <WrapperFlex gap='4px'>
          <Text weight='bold' size='xs'>
            Próximo
          </Text>
          <ArrowRight size={16} strokeWidth={2.25} />
        </WrapperFlex>
      </Button>
    </WrapperFlex>
  )
}
