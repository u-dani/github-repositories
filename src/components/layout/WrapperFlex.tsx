import styled from 'styled-components'

interface IWrapperFlexProps {
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  gap?: string
  height?: string
  justifyContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evelyn'
    | 'stretch'
  margin?: string
  maxWidth?: string
  padding?: string
  position?: 'relative'
  width?: string
  wrap?: boolean
}

export const WrapperFlex = styled.div<IWrapperFlexProps>`
  align-items: ${props => props.alignItems ?? 'center'};
  display: flex;
  flex-direction: ${props => props.direction ?? 'row'};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  gap: ${props => props.gap ?? '0px'};
  height: ${props => props.height ?? 'auto'};
  justify-content: ${props => props.justifyContent ?? 'center'};
  margin: ${({ margin }) => (margin ? margin : '0px')};
  max-width: ${props => props.maxWidth ?? '100%'};
  padding: ${({ padding }) => (padding ? padding : '0px')};
  position: ${({ position }) => position ?? 'static'};
  width: ${props => props.width ?? '100%'};
`
