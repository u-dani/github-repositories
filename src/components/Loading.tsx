import styled from 'styled-components'

export const LoadingStyle = styled.span`
  width: 30px;
  height: 30px;
  border: 4px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const Loading = () => {
  return (
    <span>
      <LoadingStyle />
    </span>
  )
}
