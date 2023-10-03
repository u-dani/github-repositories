import styled from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'

const LinkStyle = styled.span`
  .link {
    color: currentColor;
  }

  :hover * {
    text-decoration: underline;
    text-decoration-color: #58a6ff;
    color: #58a6ff;
  }
`

interface ILinkProps {
  to: string
  target?: '_blank' | '_parent' | '_self' | '_top'
  children: React.ReactNode
}

export const Link = ({ to, target, children }: ILinkProps) => {
  return (
    <LinkStyle>
      <LinkRouter to={to} target={target} className='link'>
        <span>{children}</span>
      </LinkRouter>
    </LinkStyle>
  )
}
