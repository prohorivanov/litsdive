import styled from 'styled-components'
import { media } from 'assets/styles/style-utils.js'

export const LayoutBlock = styled.div` 
  position: relative;
  height: 100%;
  width: 100%;
`

export const MainColl = styled.div`
  height: 100%;
  min-height: 300px;
  position: relative;
  width: 100%;
  ${media.mobile`
    margin-left: 0;
  `}
`

export const Author = styled.div`
  position: relative;
`
