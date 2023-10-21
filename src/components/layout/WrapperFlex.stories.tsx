import type { Meta, StoryObj } from '@storybook/react'
import { WrapperFlex } from './WrapperFlex'

type WrapperFlexArgs = React.ComponentProps<typeof WrapperFlex> & ItemsProps

interface ItemsProps {
  itemWidth: string
  itemHeight: string
  numberOfItems: number
}

const Items = ({ numberOfItems, itemWidth, itemHeight }: ItemsProps) => {
  const arr = Array.from({ length: numberOfItems }, (_, i) => i + 1)

  return (
    <>
      {arr.map(item => (
        <div
          style={{
            background: 'orange',
            height: itemHeight,
            width: itemWidth,
          }}>
          <p
            style={{
              lineHeight: itemHeight,
              textAlign: 'center',
            }}>
            item {item}
          </p>
        </div>
      ))}
    </>
  )
}

const meta: Meta<WrapperFlexArgs> = {
  title: 'Layout/WrapperFlex',
  component: WrapperFlex,
  argTypes: {
    direction: {
      control: { type: 'inline-radio' },
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    justifyContent: {
      control: { type: 'inline-radio' },
      options: [
        'start',
        'center',
        'end',
        'space-between',
        'space-around',
        'space-evelyn',
        'stretch',
      ],
    },
    alignItems: {
      control: { type: 'inline-radio' },
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
  render: args => {
    const { numberOfItems, itemWidth, itemHeight } = args

    return (
      <WrapperFlex {...args} style={{ background: '#333' }}>
        <Items
          numberOfItems={numberOfItems}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
        />
      </WrapperFlex>
    )
  },
  args: {
    width: '100%',
    height: '300px',
    direction: 'row',
    wrap: false,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    numberOfItems: 3,
    itemWidth: '100px',
    itemHeight: '100px',
  },
}

export default meta
export const Default: StoryObj<typeof WrapperFlex> = {}
