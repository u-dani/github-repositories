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
    const target = e.target as HTMLInputElement
    const selectedTargetValue = target.getAttribute('data-option')

    if (selectedTargetValue) {
      handleSelect(selectedTargetValue)
    }

    if (checkbox) {
      checkbox.checked = false
    }
  }

  return (
    <SelectStyle
      width={width}
      height={height}
      fontSize={fontSize}
      onMouseLeave={() => {
        if (checkbox) {
          checkbox.checked = false
        }
      }}>
      <input type='checkbox' id={id} />

      <WrapperFlex
        justifyContent='space-between'
        className='container-selected-value'
        gap='4px'>
        <span className='selected-value'>
          {selectedValue ?? placeholder ?? 'Selecione'}
        </span>
        <ChevronDown className='icon-rotate' />
      </WrapperFlex>

      <div className='container-options'>
        <WrapperFlex
          as='form'
          className='form-options'
          onChange={handle}
          direction='column'
          alignItems='start'>
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
        </WrapperFlex>
      </div>

      <div className='gambiarra'>
        <p className='warning'>
          Do not remove this div, when the mouse leaves the Select it closes and
          there is a little space between the Select and the Options, this
          minimum space is enough to close the Select, so this div covers this
          space :D
        </p>
        <p className='warning'>
          Não remova essa div, quando o mouse sai do Select ele fecha e fica um
          espacinho entre o Select e as Options, esse espaço mínimo é suficiente
          para fechar o Select, então essa div cobre esse espaço :P
        </p>
      </div>
    </SelectStyle>
  )
}

const SelectStyle = styled.div<
  Pick<ISelectProps, 'height' | 'width' | 'fontSize'>
>`
  position: relative;
  font-size: ${({ fontSize }) => fontSize ?? '0.875rem'};
  min-width: ${({ width }) => width ?? '100%'};
  width: ${({ width }) => width ?? '100%'};

  .selected-value {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .container-selected-value {
    height: ${({ height }) => height ?? '35px'};
    border: 1px solid rgba(250, 250, 250, 0.4);
    color: rgba(250, 250, 250, 0.4);
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
  }

  input[type='checkbox'] {
    all: unset;
    position: absolute;
    inset: 0;
    cursor: pointer;
  }

  input[type='checkbox']:checked + .container-selected-value {
    border: 1px solid rgba(250, 250, 250, 0.8);
    color: rgba(250, 250, 250, 0.8);
  }

  input[type='checkbox']:checked ~ .container-options {
    display: flex;
  }

  input[type='checkbox']:checked ~ .container-selected-value > .icon-rotate {
    transform: rotate(180deg);
  }

  .icon-rotate {
    transition: 200ms ease-in;
  }

  input[type='radio'] {
    display: none;
  }

  .option:has(input[type='radio']:checked) {
    border-color: rgba(255, 255, 255, 0.8);
  }

  .container-options {
    position: absolute;
    width: 100%;
    display: none;
    min-width: max-content;
    flex-direction: column;
    border-radius: 4px;
    z-index: 50;
    max-height: 300px;
    overflow-y: auto;
    top: 110%;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background-color: #222;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #c9c9c9;
    }

    .form-options {
      width: 100%;
      border-radius: 4px;
      background-color: #333;
      height: 100%;
    }
  }

  .option {
    width: 100%;
    background-color: #333;
    padding: 8px 12px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;

    &:hover {
      background-color: #504e4ec5;
    }
  }

  .gambiarra {
    height: 10%;
    left: 0;
    position: absolute;
    top: 100%;
    width: 100%;

    .warning {
      display: none;
    }
  }
`
