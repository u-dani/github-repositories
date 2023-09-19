import styled from 'styled-components'

interface InputProps {
  fontSize?: string
  textAlign?: 'start' | 'center' | 'justify' | 'left' | 'right' | 'end'
  width?: string
}

export const Input = styled.input<InputProps>`
  border-radius: 6px;
  border: 1px solid transparent;
  color: #333;
  font-size: ${props => props.fontSize || '1.2rem'};
  outline: none;
  padding: 8px;
  text-align: ${props => props.textAlign || 'start'};
  width: ${props => props.width || '100%'};
`
