import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { UserPage } from './UserPage'
import { WrapperFlex } from '../components/layout/WrapperFlex'

const meta: Meta<typeof UserPage> = {
  title: 'Pages/User',
  component: UserPage,
  loaders: [
    async () => ({
      user: await (await fetch('https://api.github.com/users/u-dani')).json(),
      repos: await (
        await fetch('https://api.github.com/users/u-dani/repos?per_page=20')
      ).json(),
    }),
  ],
  render: (args, { loaded: { user, repos } }) => (
    <BrowserRouter>
      <WrapperFlex>
        <UserPage {...args} user={user} repos={repos} {...args} />
      </WrapperFlex>
    </BrowserRouter>
  ),
  args: {
    isLoading: false,
    userNotFound: false,
    reposNotFound: false,
  },
}

export default meta
export const Default: StoryObj<typeof UserPage> = {}
