import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { Link } from './Link'

type LinkArgs = React.ComponentProps<typeof Link> & {
  label: string
}

const meta: Meta<LinkArgs> = {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
    },
    target: {
      control: { type: 'inline-radio' },
    },
  },
  render: ({ label, ...args }) => (
    <BrowserRouter>
      <Link {...args}>{label}</Link>
    </BrowserRouter>
  ),
}

export default meta
export const Underline: StoryObj<LinkArgs> = {
  args: {
    label: 'Link Underline',
    variant: 'underline',
  },
}

export const Button: StoryObj<LinkArgs> = {
  args: {
    label: 'Link Button',
    variant: 'button',
  },
}

export const Tag: StoryObj<LinkArgs> = {
  args: {
    label: 'Link Tag',
    variant: 'tag',
  },
}
