import styled, { css } from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'

interface ILinkProps {
  to: string
  target?: '_blank' | '_parent' | '_self' | '_top'
  children: React.ReactNode
  variant?: 'underline' | 'tag' | 'button'
}

export const LinkStyle = styled.span<Pick<ILinkProps, 'variant'>>`
  cursor: pointer;
  ${props => {
    switch (props.variant) {
      case 'underline':
        return css`
          color: currentColor;

          &:hover * {
            text-decoration: underline;
            text-decoration-color: #58a6ff;
            color: #58a6ff;
          }
        `
      case 'tag':
        return css`
          color: #58a6ff;
          background-color: rgb(88, 166, 255, 0.1);
          padding: 4px 16px;
          border-radius: 20px;
          font-weight: 500;

          &:hover {
            color: rgba(250, 250, 250, 0.9);
            text-decoration: none;
            background-color: #58a6ff;
          }
        `

      case 'button':
        return css`
          background: #58a6ff;
          border-radius: 4px;
          border: 1px solid #58a6ff;
          box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
          color: rgba(250, 250, 250, 0.9);
          letter-spacing: 0.8px;
          transition: all 0.5s;

          &:hover,
          &:active {
            background-color: initial;
            background-position: 0 0;
            color: #58a6ff;
          }

          &:active {
            opacity: 0.5;
          }
        `
    }
  }}
`

export const Link = ({
  to,
  target,
  children,
  variant = 'underline',
}: ILinkProps) => {
  return (
    <LinkStyle variant={variant}>
      <LinkRouter to={to} target={target} style={{ color: 'currentColor' }}>
        <span>{children}</span>
      </LinkRouter>
    </LinkStyle>
  )
}
