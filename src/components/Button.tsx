import styled from 'styled-components'

interface IButtonProps {
  fontSize?: string
  width?: string
  height?: string
}

export const Button = styled.button<IButtonProps>`
  font-size: ${props => props.fontSize ?? '1rem'};
  letter-spacing: 0.8px;
  border: none;
  background: transparent;

  line-height: ${props => props.height ?? '50px'};
  height: ${props => props.height ?? '50px'};
  width: ${props => props.width ?? '200px'};

  color: #fff;
  transition: all 0.5s;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
    border-radius: 4px;
  }
  &:hover::before {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.5);
    transform: scale(1.2, 1.2);
    border-radius: 4px;
  }
  &:hover::after {
    opacity: 1;
    transform: scale(1, 1);
  }
`
