import styled from 'styled-components'

interface IWrapperFlexProps {
  width?: string
  height?: string
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  gap?: string
  justifyContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evelyn'
    | 'stretch'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  wrap?: boolean
  padding?: string
}

export const WrapperFlex = styled.div<IWrapperFlexProps>`
  width: ${props => props.width ?? '100%'};
  height: ${props => props.height ?? 'auto'};
  display: flex;
  flex-direction: ${props => props.direction ?? 'row'};
  gap: ${props => props.gap ?? '0px'};
  justify-content: ${props => props.justifyContent ?? 'center'};
  align-items: ${props => props.alignItems ?? 'center'};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  padding: ${({ padding }) => (padding ? padding : '0px')};
`
