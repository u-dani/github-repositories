import { WrapperFlex } from './layout/WrapperFlex'
import { ISearchUserRepositories } from '../services/searchUserRepositories'
import { Text } from './Text'
import styled from 'styled-components'
import { Link } from './Link'
import { GitFork, Star, Scale, ArrowUpRight } from 'lucide-react'

const Circle = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #ff5773;
`

const RepositoryCardStyle = styled(WrapperFlex)`
  border: 1px solid #333;
  border-radius: 4px;
  padding: 8px 16px;
  width: 500px;
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
    <RepositoryCardStyle gap='8px' alignItems='start'>
      <WrapperFlex direction='column' gap='8px' alignItems='start'>
        <Text color='blue' size='lg'>
          <Link to={html_url} target='_blank'>
            {name}
          </Link>
        </Text>

        {description && (
          <Text color='gray' size='sm'>
            {description}
          </Text>
        )}

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
                  <Circle /> {language}
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
      </WrapperFlex>

      {homepage && (
        <WrapperFlex width='min-content' margin='2px 0px 0px 0px'>
          <Link to={homepage} variant='button'>
            <WrapperFlex padding='6px 8px'>
              <Text weight='bold' size='xs'>
                DEMO
              </Text>
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </WrapperFlex>
          </Link>
        </WrapperFlex>
      )}
    </RepositoryCardStyle>
  )
}
