import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { HomePage } from './HomePage'
import { WrapperFlex } from '../components/layout/WrapperFlex'

const meta: Meta<typeof HomePage> = {
  title: 'Pages/Home',
  component: HomePage,
  decorators: [
    Story => (
      <BrowserRouter>
        <WrapperFlex>{Story()}</WrapperFlex>
      </BrowserRouter>
    ),
  ],
}

export default meta
export const Default: StoryObj<typeof HomePage> = {}
