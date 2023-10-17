import { createContext, useEffect, useState, useContext } from 'react'

const MediaQueryContext = createContext<number | undefined>(undefined)

const WrapperMediaQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [width, setWidth] = useState<number | undefined>(undefined)

  window.onresize = (e: Event) => {
    const target = e.target as Window
    const width = target.innerWidth
    setWidth(width)
  }

  useEffect(() => {
    const { innerWidth: width } = window
    setWidth(width)
  }, [])

  return (
    <MediaQueryContext.Provider value={width}>
      {children}
    </MediaQueryContext.Provider>
  )
}

const Container = ({
  children,
  minWidth,
  maxWidth,
}: {
  children: React.ReactNode
  minWidth?: number
  maxWidth?: number
}) => {
  const minW = minWidth ?? 0
  const maxW = maxWidth ?? 99999

  const width = useContext(MediaQueryContext)
  const show = width ? width > minW && width <= maxW : false
  return show && <>{children}</>
}

export const WrapperMediaQuery = {
  Provider: WrapperMediaQueryProvider,
  Container: Container,
}
