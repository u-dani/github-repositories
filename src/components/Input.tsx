import styled from 'styled-components'

interface InputProps {
  fontSize?: string
  textAlign?: 'start' | 'center' | 'justify' | 'left' | 'right' | 'end'
  width?: string
}

export const Input = styled.input<InputProps>`
  border-radius: 4px;
  border: 1px solid transparent;
  color: #333;
  font-size: ${props => props.fontSize || '1.2rem'};
  outline: none;
  padding: 12px;
  text-align: ${props => props.textAlign || 'start'};
  width: ${props => props.width || '100%'};
  background-color: rgba(255, 255, 255, 0.9);

  &:focus {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.9);
    font-weight: normal;
  }
`
