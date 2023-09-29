import styled from 'styled-components'

export const Avatar = styled.img.attrs(({ src, alt }) => ({
  src: src,
  alt: alt ?? 'Avatar',
}))`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`
