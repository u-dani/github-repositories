import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { RepositoryCard } from './RepositoryCard'

const meta: Meta<typeof RepositoryCard> = {
  title: 'Components/RepositoryCard',
  component: RepositoryCard,
  render: (args, { loaded: { repoData } }) => {
    return (
      <BrowserRouter>
        <RepositoryCard {...args} {...repoData} />
      </BrowserRouter>
    )
  },
}

export default meta
export const Default: StoryObj<typeof RepositoryCard> = {
  loaders: [
    async () => ({
      repoData: await (
        await fetch('https://api.github.com/repos/u-dani/github-repositories')
      ).json(),
    }),
  ],
}
