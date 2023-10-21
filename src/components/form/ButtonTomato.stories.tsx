import type { Meta, StoryObj } from '@storybook/react'
import { ButtonTomato } from './Button'

type PagePropsAndCustomArgs = React.ComponentProps<typeof ButtonTomato> & {
  label?: string
}

const meta: Meta<PagePropsAndCustomArgs> = {
  title: 'Buttons/Tomato',
  component: ButtonTomato,
  render: ({ label }) => <ButtonTomato>{label}</ButtonTomato>,
  args: {
    label: 'Fechar',
  },
}

export default meta
export const Default: StoryObj<typeof ButtonTomato> = {}
