import styled from 'styled-components'

type size = {
  sm: string
  base: string
  lg: string
  xl: string
  xxl: string
}

const fontSize: size = {
  sm: '0.875rem',
  base: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
  xxl: 'clamp(1.5rem, 1.5rem + 1vw, 2.25rem)',
}
const lineHeight: size = {
  sm: '1.25rem',
  base: '1.5rem',
  lg: '1.75rem',
  xl: '2rem',
  xxl: 'clamp(1.75rem, 1.75rem + 1vw, 2.5rem)',
}

interface ITextProps {
  size?: keyof size
  align?: 'start' | 'center' | 'end' | 'justify'
  weight?: 'light' | 'regular' | 'bold'
  color?: 'blue' | 'gray'
}

export const Text = styled.span<ITextProps>`
  font-size: ${({ size }) => (size ? fontSize[size] : fontSize.base)};
  line-height: ${({ size }) => (size ? lineHeight[size] : lineHeight.base)};
  text-align: ${({ align }) => (align ? align : 'start')};
  font-weight: ${props => {
    switch (props.weight) {
      case 'light':
        return 300
      case 'bold':
        return 500
      default:
        return 400
    }
  }};

  color: ${props => {
    switch (props.color) {
      case 'gray':
        return '#8b949e'
      case 'blue':
        return '#58a6ff'
      default:
        return 'rgba(255, 255, 255, 0.9)'
    }
  }};
`

/*
xs      font-size: 0.75rem;     12px 
        line-height: 1rem;      16px 

sm      font-size: 0.875rem;    14px 
        line-height: 1.25rem;   20px 

base    font-size: 1rem;        16px 
        line-height: 1.5rem;    24px 

lg      font-size: 1.125rem;    18px 
        line-height: 1.75rem;   28px

xl  	font-size: 1.25rem;     20px 
        line-height: 1.75rem;   28px

2xl     font-size: 1.5rem;      24px 
        line-height: 2rem;      32px

3xl     font-size: 1.875rem;    30px 
        line-height: 2.25rem;   36px 

4xl     font-size: 2.25rem;     36px 
        line-height: 2.5rem;    40px 
*/
