import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'
import avatarPhoto from '/avatar-example.jpg'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    src: { control: { type: 'file' } },
  },
  args: {
    src: avatarPhoto,
    alt: 'Avatar',
  },
  decorators: [
    Story => <div style={{ width: '200px', height: '200px' }}>{Story()}</div>,
  ],
}

export default meta
export const Default: StoryObj<typeof Avatar> = {}
