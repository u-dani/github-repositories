import styled from 'styled-components'
import { GitFork, Star, Scale, ArrowUpRight } from 'lucide-react'
import { ISearchUserRepositories } from '../services/searchUserRepositories'
import { Link } from './Link'
import { Text } from './Text'
import { WrapperFlex } from './layout/WrapperFlex'

const languageColors: { [key: string]: string } = {
  'C#': '#178600',
  'C++': '#f34b7d',
  'Jupyter Notebook': '#da5b0b',
  C: '#555555',
  CSS: '#563d7c',
  Go: '#00add8',
  HTML: '#fa7a18',
  Haskell: '#8e7bce',
  Java: '#b07219',
  JavaScript: '#fddf68',
  PHP: '#4f5d95',
  Python: '#58a6ff',
  Ruby: '#701516',
  SASS: '#ff0d86',
  SCSS: '#ff0d86',
  Shell: '#89e051',
  TypeScript: '#79c0ff',
}

const Circle = styled.div<{
  language: keyof typeof languageColors
}>`
  background-color: ${({ language }) => languageColors[language] ?? '#333'};
  border-radius: 50%;
  height: 11px;
  width: 11px;
`

const RepositoryCardStyle = styled(WrapperFlex)`
  border-radius: 4px;
  border: 1px solid #333;
  padding: 8px 16px;
`

export const RepositoryCard = ({
  description,
  forks_count,
  homepage,
  html_url,
  language,
  license,
  name,
  stargazers_count,
  topics,
}: ISearchUserRepositories) => {
  return (
    <RepositoryCardStyle
      direction='column'
      justifyContent='start'
      gap='8px'
      alignItems='start'>
      <WrapperFlex justifyContent='space-between'>
        <Text color='blue' size='lg'>
          <Link to={html_url} target='_blank'>
            {name}
          </Link>
        </Text>

        {homepage && (
          <WrapperFlex width='min-content' margin='2px 0px 0px 0px'>
            <Link to={homepage} variant='button' target='_blank'>
              <WrapperFlex padding='6px 8px'>
                <Text weight='bold' size='xs'>
                  DEMO
                </Text>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </WrapperFlex>
            </Link>
          </WrapperFlex>
        )}
      </WrapperFlex>

      <WrapperFlex justifyContent='start' height='100%' alignItems='start'>
        {description && (
          <Text color='gray' size='sm'>
            {description}
          </Text>
        )}
      </WrapperFlex>

      <WrapperFlex gap='24px' justifyContent='start'>
        {topics.map(topic => (
          <Link
            to={`https://github.com/topics/${topic}`}
            key={topic}
            variant='tag'>
            <Text>{topic}</Text>
          </Link>
        ))}
      </WrapperFlex>

      <Text color='gray' size='xs'>
        <WrapperFlex justifyContent='start' gap='16px'>
          {language && (
            <Text>
              <WrapperFlex gap='4px'>
                <Circle language={language} /> {language}
              </WrapperFlex>
            </Text>
          )}

          {stargazers_count !== 0 && (
            <Text>
              <WrapperFlex gap='4px'>
                <Star size={15} />
                {stargazers_count}
              </WrapperFlex>
            </Text>
          )}

          {forks_count !== 0 && (
            <Text>
              <WrapperFlex gap='4px'>
                <GitFork size={15} /> {forks_count}
              </WrapperFlex>
            </Text>
          )}

          {license && (
            <Text>
              <WrapperFlex gap='4px'>
                <Scale size={15} />
                {license?.name}
              </WrapperFlex>
            </Text>
          )}
        </WrapperFlex>
      </Text>
    </RepositoryCardStyle>
  )
}