import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { RepositoryContainer } from './RepositoryContainer'

const meta: Meta<typeof RepositoryContainer> = {
  title: 'Components/RepositoryContainer',
  component: RepositoryContainer,
  render: (args, { loaded: { repos } }) => {
    return (
      <BrowserRouter>
        <RepositoryContainer {...args} repos={repos} />
      </BrowserRouter>
    )
  },
}

export default meta
export const Default: StoryObj<typeof RepositoryContainer> = {
  loaders: [
    async () => ({
      repos: await (
        await fetch('https://api.github.com/users/u-dani/repos?per_page=6')
      ).json(),
    }),
  ],
}
