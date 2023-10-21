import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

type TextArgs = React.ComponentProps<typeof Text> & {
  label: string
}

const meta: Meta<TextArgs> = {
  title: 'Components/Text',
  component: Text,
  args: {
    label: 'Algum texto',
    size: 'base',
    weight: 'regular',
    color: 'white',
    align: 'start',
  },
  render: ({ label, ...args }) => <Text {...args}>{label}</Text>,
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', 'xxl'],
    },
    align: {
      control: { type: 'inline-radio' },
      options: ['start', 'center', 'end', 'justify'],
    },
    weight: {
      control: { type: 'inline-radio' },
      options: ['light', 'regular', 'bold'],
    },
    color: {
      control: { type: 'inline-radio' },
      options: ['blue', 'gray', 'white'],
    },
  },
}

export default meta
export const Default: StoryObj<TextArgs> = {}
