import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import { useArgs } from '@storybook/client-api'

const options = ['Bananas', 'Maçãs', 'Uvas', 'Melancia', 'Limão']

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  argTypes: {
    selectedValue: {
      options: options,
      control: { type: 'select' },
    },
    id: {
      table: {
        disable: true,
      },
    },
    handleSelect: {
      control: false,
    },
  },
  args: {
    options: options,
    width: '300px',
    placeholder: 'Selecione uma fruta',
    fontSize: '0.975rem',
  },
}

export default meta
export const Default: StoryObj<typeof Select> = {
  render: args => {
    const [{ selectedValue }, updateArgs] = useArgs()

    return (
      <Select
        {...args}
        handleSelect={opt => updateArgs({ selectedValue: opt })}
        selectedValue={selectedValue}
      />
    )
  },
}
