import { Input, InputProps } from './Input'
import { Select, ISelectProps } from './Select'
import { WrapperFlex, IWrapperFlexProps } from '../layout/WrapperFlex'
import { removeExtraSpacesFromString } from '../../services/removeExtraSpacesFromString'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, SyntheticEvent } from 'react'

type OptionsType = 'Usuários' | 'Repositórios'

interface ISelectPropsInSearchForm
  extends Omit<ISelectProps, 'handleSelect' | 'options'> {
  defaultSelectedValue?: OptionsType
}

interface ISearchFormProps {
  WrapperFlexProps?: IWrapperFlexProps
  SelectProps?: ISelectPropsInSearchForm
  InputProps?: InputProps
}

const options: OptionsType[] = ['Usuários', 'Repositórios']

export const SearchForm = ({
  InputProps,
  SelectProps,
  WrapperFlexProps,
}: ISearchFormProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    SelectProps?.defaultSelectedValue ?? options[0]
  )
  const navigate = useNavigate()

  const searchInputRef = useRef<HTMLInputElement>(null)

  const submitSearch = (e: SyntheticEvent) => {
    e.preventDefault()

    const searchInputValue = removeExtraSpacesFromString(
      searchInputRef.current?.value ?? ''
    )

    if (!searchInputValue) {
      console.log('empty search field!')
      return
    }

    if (selectedValue === 'Usuários') {
      return navigate(`/usuario/${searchInputValue}`)
    } else if (selectedValue === 'Repositórios') {
      return navigate(`/repositorios?search=${searchInputValue}`)
    }
  }

  return (
    <WrapperFlex
      gap='8px'
      as='form'
      onSubmit={submitSearch}
      {...WrapperFlexProps}>
      <Select
        id='select-search-form'
        width='140px'
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
