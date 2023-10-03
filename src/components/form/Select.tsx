import styled from 'styled-components'
import { ChevronDown } from 'lucide-react'
import { WrapperFlex } from '../layout/WrapperFlex'

export interface ISelectProps {
  id: string
  fontSize?: string
  height?: string
  options: string[]
  placeholder?: string
  selectedValue?: string
  width?: string
  handleSelect: (selectedTargetValue: string) => void
}

const Checkbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  all: unset;
  position: absolute;
  inset: 0;
  cursor: pointer;
`

const SelectStyle = styled.div<
  Pick<ISelectProps, 'height' | 'width' | 'fontSize'>
>`
  position: relative;
  font-size: ${({ fontSize }) => fontSize ?? '0.875rem'};
  width: ${({ width }) => width ?? '100%'};

  .selected-value {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .container-selected-value {
    width: 100%;
    border: 1px solid rgba(250, 250, 250, 0.4);
    color: rgba(250, 250, 250, 0.4);
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    height: ${({ height }) => height ?? '35px'};
  }

  ${Checkbox}:checked + .container-selected-value {
    border: 1px solid rgba(250, 250, 250, 0.8);
    color: rgba(250, 250, 250, 0.8);
  }

  ${Checkbox}:checked ~ .container-options {
    display: flex;
  }

  .icon-rotate {
    transition: 200ms ease-in;
  }

  ${Checkbox}:checked ~ .container-selected-value > .icon-rotate {
    transform: rotate(180deg);
  }

  input[type='radio'] {
    display: none;
  }

  .option:has(input[type='radio']:checked) {
    border-color: rgba(255, 255, 255, 0.8);
  }

  .container-options {
    display: none;
    position: absolute;
    min-width: max-content;
    width: 100%;
    flex-direction: column;
    background-color: #333;
    margin-top: 4px;
    border-radius: 4px;
    z-index: 50;
  }

  .option {
    background-color: #333;
    padding: 8px 12px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      background-color: #504e4ec5;
    }
  }
`

export const Select = ({
  id,
  fontSize,
  height,
  options,
  placeholder,
  selectedValue,
  width,
  handleSelect,
}: ISelectProps) => {
  const checkbox = document.querySelector<HTMLInputElement>(`#${id}`)

  const handle = (e: React.SyntheticEvent) => {
    checkbox?.click()
    const target = e.target as HTMLInputElement
    const selectedTargetValue = target.getAttribute('data-option')
    if (selectedTargetValue) {
      handleSelect(selectedTargetValue)
    }
  }

  return (
    <SelectStyle width={width} height={height} fontSize={fontSize}>
      <Checkbox id={id} />

      <WrapperFlex
        justifyContent='space-between'
        className='container-selected-value'
        gap='4px'>
        <span className='selected-value'>
          {selectedValue ?? placeholder ?? 'Selecione'}
        </span>
        <ChevronDown className='icon-rotate' />
      </WrapperFlex>

      <form className='container-options' onChange={handle}>
        {options.map(option => (
          <label htmlFor={option} className='option' key={option}>
            <input
              type='radio'
              name='options'
              id={option}
              data-option={option}
              defaultChecked={selectedValue === option}
            />
            <span>{option}</span>
          </label>
        ))}
      </form>
    </SelectStyle>
  )
}
