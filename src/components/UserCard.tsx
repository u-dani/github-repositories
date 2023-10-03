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

export const UserCard = (props: ISearchUserResponse) => {
  return (
    <WrapperFlex direction='column' alignItems='start' gap='8px'>
      <WrapperFlex margin='4px 0px'>
        <Avatar src={props.avatar_url} alt={`Avatar de ${props.login}`} />
      </WrapperFlex>

      <div>
        <p>
          <Text size='xl' weight='bold'>
            {props.name}
          </Text>
        </p>
        <Text size='lg' weight='light'>
          {props.login}
        </Text>
      </div>

      {props?.bio && <Text>{props?.bio}</Text>}

      <Text size='sm'>
        <WrapperFlex
          justifyContent='start'
          alignItems='center'
          gap='6px'
          margin='8px 0px 16px 0px'>
          <Icon icon={Users2} />
          <Link to='https://localhost:5173/usuario/fire?tab=seguidores'>
            <Text weight='bold' size='sm'>
              {props.followers}
            </Text>{' '}
            <Text size='sm' color='gray'>
              seguidores
            </Text>
          </Link>
          <Text> · </Text>
          <Link to='https://localhost:5173/usuario/fire?tab=seguindo'>
            <Text size='sm' weight='bold'>
              {props.following}
            </Text>{' '}
            <Text size='sm' color='gray'>
              seguindo
            </Text>
          </Link>
        </WrapperFlex>

        <WrapperFlex direction='column' gap='6px'>
          {props?.company && (
            <WrapperFlex justifyContent='start' alignItems='center' gap='6px'>
              <Icon icon={Building} /> {props?.company}
            </WrapperFlex>
          )}

          {props?.location && (
            <WrapperFlex justifyContent='start' alignItems='center' gap='6px'>
              <Icon icon={MapPin} /> {props?.location}
            </WrapperFlex>
          )}

          {props?.blog && (
            <WrapperFlex justifyContent='start' alignItems='center' gap='6px'>
              <Icon icon={LinkIcon} />
              <Link to={props.blog}>
                <Text size='sm'>{props.blog}</Text>
              </Link>
            </WrapperFlex>
          )}

          {props?.twitter_username && (
            <WrapperFlex justifyContent='start' alignItems='center' gap='6px'>
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
    </WrapperFlex>
  )
}
