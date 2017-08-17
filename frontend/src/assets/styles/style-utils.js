import { css } from 'styled-components'
import { MEDIA } from './style-vars.js'

export const media = {
  mobile: (...args) => css`
    @media (${MEDIA.mobile}) {
      ${css(...args)}
    }
  `,
  iphone6: (...args) => css`
    @media (${MEDIA.iphone6}) {
      ${css(...args)}
    }
  `,
  tablet945: (...args) => css`
    @media (${MEDIA.tablet}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (${MEDIA.tablet}) {
      ${css(...args)}
    }
  `,
  desktop1024: (...args) => css`
    @media (${MEDIA.desktop1024}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (${MEDIA.desktop}) {
      ${css(...args)}
    }
  `,
  desktop_xl: (...args) => css`
    @media (${MEDIA.desktop_xl}) {
      ${css(...args)}
    }
  `
}
