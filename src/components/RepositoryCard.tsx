import { WrapperFlex } from './layout/WrapperFlex'
import { ISearchUserRepositories } from '../services/searchUserRepositories'
import { Text } from './Text'
import styled from 'styled-components'
import { Link } from './Link'
import { GitFork, Star, Scale } from 'lucide-react'

const Circle = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #ff5773;
`

export const RepositoryCard = ({
  name,
  description,
  html_url,
  language = 'SCSS',
  license,
  forks_count,
  stargazers_count,
  homepage,
  topics,
}: ISearchUserRepositories) => {
  return (
    <WrapperFlex direction='column' gap='8px' alignItems='start'>
      <WrapperFlex justifyContent='space-between'>
        <Text color='blue' size='xl'>
          <Link to={html_url} target='_blank'>
            {name}
          </Link>
        </Text>

        <Link to={homepage} variant='button'>
          <Text weight='bold' size='sm'>
            DEMO
          </Text>
        </Link>
      </WrapperFlex>

      <Text color='gray' size='sm'>
        {description}
      </Text>

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
          <Text>
            <WrapperFlex gap='4px'>
              <Circle /> {language}
            </WrapperFlex>
          </Text>

          <Text>
            <WrapperFlex gap='4px'>
              <Star size={15} />
              {stargazers_count}
            </WrapperFlex>
          </Text>

          <Text>
            <WrapperFlex gap='4px'>
              <GitFork size={15} /> {forks_count}
            </WrapperFlex>
          </Text>

          <Text>
            <WrapperFlex gap='4px'>
              <Scale size={15} />
              {license?.name}
            </WrapperFlex>
          </Text>
        </WrapperFlex>
      </Text>
    </WrapperFlex>
  )
}
