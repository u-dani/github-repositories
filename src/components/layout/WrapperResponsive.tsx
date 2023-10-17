import { createContext, useEffect, useState, useContext } from 'react'

const IsMobileContext = createContext<boolean | undefined>(undefined)

const WrapperResponsiveProvider = ({
  children,
  maxWidthMobile,
}: {
  children: React.ReactNode
  maxWidthMobile?: number
}) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)
  const maxWidth = maxWidthMobile ?? 600

  window.onresize = (e: Event) => {
    const target = e.target as Window
    const width = target.innerWidth
    width <= maxWidth ? setIsMobile(true) : setIsMobile(false)
  }

  console.log('resize mlk ', isMobile)

  useEffect(() => {
    const { innerWidth: width } = window
    width <= maxWidth ? setIsMobile(true) : setIsMobile(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <IsMobileContext.Provider value={isMobile}>
      {children}
    </IsMobileContext.Provider>
  )
}

const DesktopContainer = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useContext(IsMobileContext)

  return !isMobile && <>{children}</>
}

const MobileContainer = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useContext(IsMobileContext)

  return isMobile && <>{children}</>
}

export const WrapperResponsive = {
  Provider: WrapperResponsiveProvider,
  Desktop: DesktopContainer,
  Mobile: MobileContainer,
}
