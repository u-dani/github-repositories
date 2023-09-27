import { X } from 'lucide-react'
import styled from 'styled-components'
import { WrapperFlex } from './layout/WrapperFlex'

interface IMessageProps {
  message: string
  state: 'success' | 'warning' | 'error'
  show: boolean
  handleClose: () => void
}

const MessageStyle = styled.span<Pick<IMessageProps, 'state'>>`
  background-color: ${props => {
    switch (props.state) {
      case 'success':
        return 'lightgreen'
      case 'warning':
        return '#ffff6a'
      case 'error':
        return '#f37a55'
    }
  }};

  padding: 8px 16px;
  color: #222;
  width: 100%;
  font-weight: 500;
  font-size: 0.9rem;
  border-radius: 0px 0px 4px 4px;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;

  .btn {
    border: 1px solid transparent;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    background: transparent;

    &:hover {
      background: rgb(0, 0, 0, 0.1);
    }
  }

  .icon {
    width: 1.1rem;
  }
`

const ProgressBar = styled.span`
  width: 100%;
  background: yellow;
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: p-bar 3s linear forwards;
  border-radius: 4px;

  @keyframes p-bar {
    from {
      left: 0;
    }
    to {
      left: 100%;
    }
  }
`

export const Message = ({
  message,
  state,
  show,
  handleClose,
}: IMessageProps) => {
  return (
    show && (
      <MessageStyle state={state}>
        <WrapperFlex justifyContent='space-between'>
          <ProgressBar />
          <span>{message}</span>
          <button className='btn' onClick={handleClose}>
            <X className='icon' />
          </button>
        </WrapperFlex>
      </MessageStyle>
    )
  )
}

// melhorar o progress bar, parece mt engessado
