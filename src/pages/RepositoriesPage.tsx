import styled from 'styled-components'
import { Circle } from '../components/RepositoryCard'
import { Text } from '../components/Text'
import { WrapperFlex } from '../components/layout/WrapperFlex'
import { X } from 'lucide-react'
import { useState } from 'react'

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Shell',
  'Kotlin',
  'SASS',
  'HTML',
]

interface IFilters {
  language: string | undefined
}

export const RepositoriesPage = () => {
  const [filters, setFilters] = useState<IFilters>({ language: undefined })

  console.log(filters)

  const handleFilterByLanguage = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const language = target.getAttribute('data-language')

    if (language) {
      setFilters({ ...filters, language })
    }
  }

  return (
    <WrapperFlex
      alignItems='start'
      padding='40px 16px'
      gap='32px'
      style={{ color: '#dddddd' }}>
      <WrapperFlex
        width='360px'
        direction='column'
        alignItems='start'
        gap='16px'>
        <Text weight='bold' size='lg'>
          Filtrar por
        </Text>

        <WrapperFlex direction='column' alignItems='start' gap='4px'>
          <Text size='sm' weight='bold' color='gray'>
            Linguagens
          </Text>

          <WrapperFlex
            direction='column'
            as='form'
            onChange={handleFilterByLanguage}>
            {filters.language ? (
              <ListItem>
                <WrapperFlex>
                  <WrapperFlex gap='8px' justifyContent='start'>
                    <Circle language={filters.language} />
                    <Text size='sm'>{filters.language}</Text>
                  </WrapperFlex>
                  <X
                    size={20}
                    className='close-icon'
                    onClick={() => {
                      setFilters({ ...filters, language: undefined })
                    }}
                  />
                </WrapperFlex>
              </ListItem>
            ) : (
              <>
                {languages.map(lang => (
                  <ListItem>
                    <WrapperFlex gap='8px' justifyContent='start'>
                      <input
                        type='radio'
                        name='filter-language'
                        data-language={lang}
                      />
                      <Circle language={lang} />
                      <Text size='sm'>{lang}</Text>
                    </WrapperFlex>
                  </ListItem>
                ))}
              </>
            )}
          </WrapperFlex>
        </WrapperFlex>
      </WrapperFlex>

      <WrapperFlex></WrapperFlex>
    </WrapperFlex>
  )
}

const ListItem = styled.span`
  width: 100%;
  cursor: pointer;
  border-radius: 6px;
  padding: 6px 12px;
  position: relative;

  input[type='radio'] {
    all: unset;
    position: absolute;
    inset: 0;
  }

  .close-icon:hover {
    color: tomato;
  }

  &:hover {
    background-color: #333;
  }
`
