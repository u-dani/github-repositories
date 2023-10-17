import styled from 'styled-components'
import { Avatar } from '../components/Avatar'
import {
  Building,
  Link as LinkIcon,
  MapPin,
  Twitter,
  Users2,
} from 'lucide-react'
import { ISearchUserResponse } from '../services/searchUser'
import { Link } from './Link'
import { Text } from '../components/Text'
import { WrapperFlex } from '../components/layout/WrapperFlex'

const IconStyle = styled.span`
  width: 18px;
  height: 18px;
  .icon {
    width: 18px;
    height: 18px;
    color: #a3aab3;
  }
`

export const Icon = ({ icon: Icon }: { icon: React.ElementType }) => {
  return (
    <IconStyle>
      <Icon className='icon' />
    </IconStyle>
  )
}

interface IUserCardProps extends ISearchUserResponse {
  variant?: 'portrait' | 'landscape'
}

export const UserCard = ({
  variant = 'portrait',
  ...props
}: IUserCardProps) => {
  return (
    <>
      {variant === 'portrait' && (
        <WrapperFlex direction='column' alignItems='start' gap='8px'>
          <WrapperFlex margin='4px 0px'>
            <WrapperFlex width='90%'>
              <Avatar src={props.avatar_url} alt={`Avatar de ${props.login}`} />
            </WrapperFlex>
          </WrapperFlex>

          <WrapperFlex alignItems='start' direction='column'>
            <Text size='xl' weight='bold'>
              {props.name}
            </Text>

            <Text size='lg' weight='light'>
              {props.login}
            </Text>
          </WrapperFlex>

          {props?.bio && <Text>{props?.bio}</Text>}

          <Text size='sm'>
            <WrapperFlex
              justifyContent='start'
              alignItems='center'
              gap='6px'
              margin='8px 0px 16px 0px'>
              <Icon icon={Users2} />
              <WrapperFlex wrap justifyContent='start' gap='0px 6px'>
                <Link
                  to={`https://github.com/${props.login}?tab=followers`}
                  target='_blank'>
                  <Text weight='bold'>{props.followers}</Text>{' '}
                  <Text color='gray'>seguidores</Text>
                </Link>
                <Text> · </Text>
                <Link
                  to={`https://github.com/${props.login}?tab=following`}
                  target='_blank'>
                  <Text weight='bold'>{props.following}</Text>{' '}
                  <Text color='gray'>seguindo</Text>
                </Link>
              </WrapperFlex>
            </WrapperFlex>

            <WrapperFlex direction='column' gap='6px'>
              {props?.company && (
                <WrapperFlex
                  justifyContent='start'
                  alignItems='center'
                  gap='6px'>
                  <Icon icon={Building} /> {props?.company}
                </WrapperFlex>
              )}

              {props?.location && (
                <WrapperFlex
                  justifyContent='start'
                  alignItems='center'
                  gap='6px'>
                  <Icon icon={MapPin} /> {props?.location}
                </WrapperFlex>
              )}

              {props?.blog && (
                <WrapperFlex
                  justifyContent='start'
                  alignItems='center'
                  gap='6px'>
                  <Icon icon={LinkIcon} />
                  <Link to={props.blog}>
                    <Text size='sm'>{props.blog}</Text>
                  </Link>
                </WrapperFlex>
              )}

              {props?.twitter_username && (
                <WrapperFlex
                  justifyContent='start'
                  alignItems='center'
                  gap='6px'>
                  <Icon icon={Twitter} />
                  <Link
                    to={`https://twitter.com/${props.twitter_username}`}
                    target='_blank'>
                    <Text size='sm'>@{props.twitter_username}</Text>
                  </Link>
                </WrapperFlex>
              )}
            </WrapperFlex>
          </Text>

          <WrapperFlex margin='8px 0px'>
            <Link to={props.html_url} variant='button' target='_blank'>
              <WrapperFlex padding='6px 8px' height='35px'>
                <Text weight='bold' size='sm'>
                  VISITAR
                </Text>
              </WrapperFlex>
            </Link>
          </WrapperFlex>
        </WrapperFlex>
      )}

      {variant === 'landscape' && (
        <WrapperFlex direction='column' alignItems='start' gap='12px'>
          <WrapperFlex margin='0px' gap='16px'>
            <WrapperFlex maxWidth='110px'>
              <Avatar src={props.avatar_url} alt={`Avatar de ${props.login}`} />
            </WrapperFlex>

            <WrapperFlex alignItems='start' direction='column'>
              <Link to={props.html_url} target='_blank'>
                <Text size='xl' weight='bold' color='blue'>
                  {props.name}
                </Text>
              </Link>

              <Text size='lg' weight='light'>
                {props.login}
              </Text>
            </WrapperFlex>
          </WrapperFlex>

          {props?.bio && <Text>{props?.bio}</Text>}

          <Text size='sm'>
            <WrapperFlex direction='column' gap='6px'>
              {props?.blog && (
                <WrapperFlex
                  justifyContent='start'
                  alignItems='center'
                  gap='6px'>
                  <Icon icon={LinkIcon} />
                  <Link to={props.blog}>
                    <Text size='sm'>{props.blog}</Text>
                  </Link>
                </WrapperFlex>
              )}

              {props?.twitter_username && (
                <WrapperFlex
                  justifyContent='start'
                  alignItems='center'
                  gap='6px'>
                  <Icon icon={Twitter} />
                  <Link
                    to={`https://twitter.com/${props.twitter_username}`}
                    target='_blank'>
                    <Text size='sm'>@{props.twitter_username}</Text>
                  </Link>
                </WrapperFlex>
              )}
            </WrapperFlex>

            <WrapperFlex justifyContent='start' gap='6px' margin='8px 0px'>
              <Icon icon={Users2} />
              <Link
                to={`https://github.com/${props.login}?tab=followers`}
                target='_blank'>
                <Text weight='bold'>{props.followers}</Text>{' '}
                <Text color='gray'>seguidores</Text>
              </Link>
              <Text> · </Text>
              <Link
                to={`https://github.com/${props.login}?tab=following`}
                target='_blank'>
                <Text weight='bold'>{props.following}</Text>{' '}
                <Text color='gray'>seguindo</Text>
              </Link>
            </WrapperFlex>
          </Text>
        </WrapperFlex>
      )}
    </>
  )
}
