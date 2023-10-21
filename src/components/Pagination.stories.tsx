import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'
import { BrowserRouter } from 'react-router-dom'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  decorators: [Story => <BrowserRouter>{Story()}</BrowserRouter>],
  args: {
    maxPages: 3,
  },
}

export default meta
export const Default: StoryObj<typeof Pagination> = {}
