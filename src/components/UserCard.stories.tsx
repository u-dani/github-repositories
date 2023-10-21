import type { Meta, StoryObj } from '@storybook/react'
import { UserCard } from './UserCard'
import { BrowserRouter } from 'react-router-dom'

const meta: Meta<typeof UserCard> = {
  title: 'Components/UserCard',
  component: UserCard,
  decorators: [Story => <BrowserRouter>{Story()}</BrowserRouter>],
  loaders: [
    async () => ({
      user: await (await fetch('https://api.github.com/users/u-dani')).json(),
    }),
  ],
  argTypes: {
    variant: {
      control: false,
    },
  },
}

export default meta
export const Portrait: StoryObj<typeof UserCard> = {
  render: (args, { loaded: { user } }) => (
    <div style={{ width: '300px' }}>
      <UserCard {...args} {...user} />
    </div>
  ),
  args: {
    variant: 'portrait',
  },
}

export const Landscape: StoryObj<typeof UserCard> = {
  render: (args, { loaded: { user } }) => <UserCard {...args} {...user} />,
  args: {
    variant: 'landscape',
  },
}
