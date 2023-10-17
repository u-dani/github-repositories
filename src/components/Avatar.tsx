import styled from 'styled-components'

export const Avatar = styled.img.attrs(({ src, alt }) => ({
  src: src,
  alt: alt ?? 'Avatar',
}))`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 1px solid #222;
`
