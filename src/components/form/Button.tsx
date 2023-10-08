import styled from 'styled-components'

interface IButtonProps {
  fontSize?: string
  height?: string
  width?: string
}

export const Button = styled.button<IButtonProps>`
  background: #58a6ff;
  border-radius: 4px;
  border: 1px solid #58a6ff;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  color: rgba(250, 250, 250, 0.9);
  font-size: ${props => props.fontSize ?? '0.9rem'};
  font-weight: 500;
  height: ${props => props.height ?? '40px'};
  letter-spacing: 0.8px;
  line-height: ${props => props.height ?? '40px'};
  position: relative;
  transition: all 0.5s;
  width: ${props => props.width ?? '140px'};
  padding: 0px 6px;
  min-width: max-content;

  &:hover:enabled,
  &:active:enabled {
    background-color: initial;
    background-position: 0 0;
    color: #58a6ff;
  }

  &:active:enabled {
    opacity: 0.5;
  }

  &:disabled {
    box-shadow: none;
    background-color: rgb(34, 34, 34, 0.5);
    border-color: transparent;
    color: #333;
  }
`
