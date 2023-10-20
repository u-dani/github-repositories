import styled, { css } from 'styled-components'
import { Button } from './Button'
import { ListFilter } from 'lucide-react'
import { Text } from '../Text'

interface IButtonFilterProps {
  id: string
  size?: 'medium' | 'small'
  label?: string
}

export const ButtonFilter = ({
  size = 'medium',
  id,
  label,
}: IButtonFilterProps) => {
  const textSize = size === 'medium' ? 'base' : 'sm'
  const iconSize = size === 'medium' ? 20 : 16

  return (
    <ButtonFilterStyle size={size}>
      <input type='checkbox' id={id} />
      <ListFilter size={iconSize} strokeWidth={2.5} className='filter-icon' />
      <Text weight='bold' size={textSize}>
        {label ?? 'Filtros'}
      </Text>
    </ButtonFilterStyle>
  )
}

export const ButtonFilterStyle = styled(Button)<
  Pick<IButtonFilterProps, 'size'>
>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  input[type='checkbox'] {
    all: unset;
    position: absolute;
    inset: 0;
    cursor: pointer;
  }

  ${props => {
    switch (props.size) {
      case 'medium':
        return css`
          width: max-content;
          height: 35px;
          padding: 0px 12px;
        `

      case 'small':
        return css`
          width: max-content;
          height: 32px;
          padding: 0px 10px;
        `
    }
  }}

  &:has(input[type='checkbox']:checked) {
    background-color: transparent;
    background-position: 0 0;
    color: #58a6ff;
  }

  .button-filter-icon {
    transition: 400ms;
  }

  &:has(input[type='checkbox']:checked) .button-filter-icon {
    transform: rotate(180deg);
  }
`
