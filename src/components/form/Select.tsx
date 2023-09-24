import { ChevronDown } from 'lucide-react'
import styled from 'styled-components'
import { WrapperFlex } from '../layout/WrapperFlex'

interface ISelectProps {
  placeholder?: string
  selectedValue?: string
  width?: string
  height?: string
  options: string[]
  handleSelect: (selectedTargetValue: string) => void
}

const SelectStyle = styled.div<{ width?: string; height?: string }>`
  position: relative;
  width: ${({ width }) => width ?? '100%'};
  font-size: 1rem;

  .selected-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .container-selected-value {
    border: 1px solid rgba(250, 250, 250, 0.4);
    color: rgba(250, 250, 250, 0.4);
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    height: ${({ height }) => height ?? 'auto'};
  }

  #iselect-checkbox:checked + .container-selected-value {
    border: 1px solid rgba(250, 250, 250, 0.8);
    color: rgba(250, 250, 250, 0.8);
  }

  #iselect-checkbox {
    all: unset;
    position: absolute;
    inset: 0;
    cursor: pointer;
  }

  #iselect-checkbox:checked ~ .container-options {
    display: flex;
  }

  .icon-rotate {
    transition: 200ms ease-in;
  }

  #iselect-checkbox:checked ~ .container-selected-value > .icon-rotate {
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
  placeholder,
  options,
  handleSelect,
  width,
  height,
  selectedValue,
}: ISelectProps) => {
  const checkbox = document.querySelector<HTMLInputElement>('#iselect-checkbox')

  const handle = (e: React.SyntheticEvent) => {
    checkbox?.click()
    const target = e.target as HTMLInputElement
    const selectedTargetValue = target.getAttribute('data-option')
    console.log(selectedTargetValue)
    if (selectedTargetValue) {
      handleSelect(selectedTargetValue)
    }
  }

  return (
    <SelectStyle width={width} height={height}>
      <input type='checkbox' id='iselect-checkbox' />

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
