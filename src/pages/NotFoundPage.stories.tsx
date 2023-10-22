import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'

const meta: Meta<typeof NotFoundPage> = {
  title: 'Pages/NotFound',
  component: NotFoundPage,
  decorators: [Story => <BrowserRouter>{Story()}</BrowserRouter>],
}

export default meta
export const Default: StoryObj<typeof NotFoundPage> = {}
