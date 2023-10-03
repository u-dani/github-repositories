import { useState, useRef, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, InputProps } from './Input'
import { WrapperFlex, IWrapperFlexProps } from '../layout/WrapperFlex'
import { Select, ISelectProps } from './Select'
import { removeExtraSpacesFromString } from '../../services/removeExtraSpacesFromString'

const options = ['Usuários', 'Repositórios']

interface ISearchFormProps {
  WrapperFlexProps?: IWrapperFlexProps
  SelectProps?: Omit<ISelectProps, 'handleSelect' | 'options'>
  InputProps?: InputProps
  handleError?: (message: string) => void
}

export const SearchForm = ({
  WrapperFlexProps,
  SelectProps,
  InputProps,
  handleError = message => {
    console.log(message)
  },
}: ISearchFormProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    options[0]
  )
  const navigate = useNavigate()

  const searchInputRef = useRef<HTMLInputElement>(null)

  const submitSearch = (e: SyntheticEvent) => {
    e.preventDefault()

    const searchInputValue = removeExtraSpacesFromString(
      searchInputRef.current?.value ?? ''
    )

    if (!searchInputValue) {
      handleError('Campo de busca vazio')
      return
    }

    if (selectedValue === 'Usuários') {
      navigate(`usuario/${searchInputValue}`)
    } else if (selectedValue === 'Repositórios') {
      navigate(`repositorios?search=${searchInputValue}`)
    }
  }

  return (
    <WrapperFlex
      gap='8px'
      as='form'
      onSubmit={submitSearch}
      width='600px'
      {...WrapperFlexProps}>
      <Select
        id='select-search-form'
        width='30%'
        options={options}
        selectedValue={selectedValue}
        handleSelect={value => {
          setSelectedValue(value)
        }}
        {...SelectProps}
      />

      <Input
        width='100%'
        ref={searchInputRef}
        placeholder={
          selectedValue === 'Usuários'
            ? 'Digite o usuário do Github'
            : 'Digite o nome do repositório'
        }
        required
        {...InputProps}
      />
    </WrapperFlex>
  )
}
