import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  argTypes: {
    value: { control: { type: 'text' } },
    textAlign: {
      control: { type: 'inline-radio' },
      options: ['start', 'center', 'end'],
    },
    padding: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
  },
  args: {
    placeholder: 'Placeholder',
    width: '300px',
    textAlign: 'start',
  },
}

export default meta
export const Default: StoryObj<typeof Input> = {}
