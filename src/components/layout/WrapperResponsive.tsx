import styled from 'styled-components'

const WrapperResponsiveProvider = ({
  children,
  maxWidthMobile,
}: {
  children: React.ReactNode
  maxWidthMobile?: string
}) => {
  return (
    <ContainerResponsiveStyle maxWidthMobile={maxWidthMobile}>
      {children}
    </ContainerResponsiveStyle>
  )
}

const DesktopContainer = styled.div``
const MobileContainer = styled.div``

const ContainerResponsiveStyle = styled.div<{ maxWidthMobile?: string }>`
  width: 100%;

  ${DesktopContainer} {
    display: block;
  }

  ${MobileContainer} {
    display: none;
  }

  @media screen and (max-width: ${props => props.maxWidthMobile ?? '600px'}) {
    ${MobileContainer} {
      display: block;
    }

    ${DesktopContainer} {
      display: none;
    }
  }
`

export const WrapperResponsive = {
  Provider: WrapperResponsiveProvider,
  Desktop: DesktopContainer,
  Mobile: MobileContainer,
}
