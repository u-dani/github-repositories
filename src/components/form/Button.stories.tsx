import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

type ButtonArgs = React.ComponentProps<typeof Button> & {
  label?: string
}

const meta: Meta<ButtonArgs> = {
  title: 'Buttons/Button',
  component: Button,
  render: ({ label }) => <Button>{label}</Button>,
  args: {
    label: 'Button',
  },
}

export default meta
export const Default: StoryObj<typeof Button> = {}
