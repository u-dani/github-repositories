import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { SearchForm } from './SearchForm'

const meta: Meta<typeof SearchForm> = {
  title: 'Form/SearchForm',
  component: SearchForm,
  decorators: [Story => <BrowserRouter>{Story()}</BrowserRouter>],
  args: {
    WrapperFlexProps: {
      width: '700px',
    },
    SelectProps: {
      id: 'search-form-select',
      placeholder: 'Selecione',
      width: '150px',
      height: '40px',
      fontSize: '0.975rem',
    },
    InputProps: {
      width: '100%',
      height: '40px',
      fontSize: '0.975rem',
    },
  },
}

export default meta
export const Default: StoryObj<typeof SearchForm> = {}
