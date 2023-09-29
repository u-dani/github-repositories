import styled from 'styled-components'

interface InputProps {
  fontSize?: string
  textAlign?: 'start' | 'center' | 'justify' | 'left' | 'right' | 'end'
  width?: string
  height?: string
  padding?: string
  maxWidth?: string
}

export const Input = styled.input<InputProps>`
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.9);
  font-size: ${props => props.fontSize || '1.2rem'};
  outline: none;
  padding: ${props => props.padding ?? '8px 12px'};
  text-align: ${props => props.textAlign || 'start'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  max-width: ${props => props.maxWidth || 'auto'};
  background: transparent;
  border: 2px solid transparent;
  outline: 1px solid rgba(250, 250, 250, 0.4);

  &:focus {
    background: transparent;
    border-color: #58a6ff;
    outline-color: transparent;
    font-weight: normal;
  }
`
