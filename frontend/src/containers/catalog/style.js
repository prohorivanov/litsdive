import styled from 'styled-components'
import { media } from 'assets/styles/style-utils.js'
import Select from 'react-select'
import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js'

export const Layout = styled.div` 
  position: relative;
  height: 100%;
  width: 100%;  
`

export const MainColl = styled.div`
  height: 100%;
  width: 100%;
  ${media.mobile`
    margin-left: 0;
  `}
`

export const Author = styled.div`
  position: relative;
`

export const WrapperGallery = styled.div`
  margin-top: 30px;
`

export const SelectExtended = styled(Select)`
  width: 300px;
  ${media.iphone6`       
    width: 100%;  
  `}
  & .Select-control {
    width: 300px;
    ${media.iphone6`       
      width: 100%;  
    `}
  }
`
