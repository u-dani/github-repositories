import styled from 'styled-components'

interface InputProps {
  fontSize?: string
  textAlign?: 'start' | 'center' | 'justify' | 'left' | 'right' | 'end'
  width?: string
  maxWidth?: string
}

export const Input = styled.input<InputProps>`
  border-radius: 4px;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.9);
  font-size: ${props => props.fontSize || '1.2rem'};
  outline: none;
  padding: 12px;
  text-align: ${props => props.textAlign || 'start'};
  width: ${props => props.width || '100%'};
  max-width: ${props => props.maxWidth || 'auto'};
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.2);

  &:focus {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.5);
    font-weight: normal;
  }
`
