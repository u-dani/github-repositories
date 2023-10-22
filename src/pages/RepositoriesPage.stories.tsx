import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { RepositoriesPage } from './RepositoriesPage'
import { WrapperFlex } from '../components/layout/WrapperFlex'

const meta: Meta<typeof RepositoriesPage> = {
  title: 'Pages/Repositories',
  component: RepositoriesPage,
  render: (args, { loaded: { repos } }) => (
    <BrowserRouter>
      <WrapperFlex>
        <RepositoriesPage {...args} repos={repos} />
      </WrapperFlex>
    </BrowserRouter>
  ),
  args: {
    query: 'github-repositories',
    reposNotFound: false,
    isLoading: false,
  },
  argTypes: {
    query: {
      control: { readonly: true },
    },
  },
  loaders: [
    async () => ({
      repos: await (
        await fetch(
          'https://api.github.com/search/repositories?q=github-repositories&per_page=20'
        )
      ).json(),
    }),
  ],
}

export default meta
export const Default: StoryObj<typeof RepositoriesPage> = {}
