import type { Meta, StoryObj } from '@storybook/react'
import { ButtonFilter } from './ButtonFilter'

const meta: Meta<typeof ButtonFilter> = {
  title: 'Buttons/Filter',
  component: ButtonFilter,
  args: {
    size: 'medium',
  },
}

export default meta
export const Default: StoryObj<typeof ButtonFilter> = {}
