import styled from 'styled-components'
import { GitFork, Star, Scale, ArrowUpRight } from 'lucide-react'
import { ISearchUserRepositoriesResponse } from '../services/searchUserRepositories'
import { Link } from './Link'
import { Text } from './Text'
import { WrapperFlex } from './layout/WrapperFlex'

const languageColors: { [key: string]: string } = {
  'c#': '#178600',
  'c++': '#f34b7d',
  'jupyter notebook': '#da5b0b',
  'objective-c': '#4b0082',
  assembly: '#5c4141',
  c: '#555555',
  css: '#563d7c',
  gdscript: '#379bf3',
  go: '#00add8',
  haskell: '#8e7bce',
  html: '#fa7a18',
  java: '#b07219',
  javascript: '#fddf68',
  lua: '#001482',
  ocaml: '#ff4500',
  php: '#4f5d95',
  python: '#58a6ff',
  ruby: '#701516',
  rust: '#ffc0cb',
  sass: '#ff0d86',
  scala: '#c2d64d',
  scss: '#ff0d86',
  shell: '#89e051',
  typescript: '#79c0ff',
}

export const Circle = styled.div<{
  language: keyof typeof languageColors
  width?: string
}>`
  background-color: ${({ language }) =>
    languageColors[language.toString().toLowerCase()] ?? '#f5f5f5'};
  border-radius: 50%;
  height: ${({ width }) => width ?? '11px'};
  width: ${({ width }) => width ?? '11px'};
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
}: ISearchUserRepositoriesResponse) => {
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

      <WrapperFlex gap='8px' justifyContent='start' wrap>
        {topics.map(topic => (
          <Link
            to={`https://github.com/topics/${topic}`}
            key={topic}
            variant='tag'>
            <Text size='sm' weight='bold'>
              {topic}
            </Text>
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
