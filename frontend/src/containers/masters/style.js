import styled from 'styled-components'
import { rgba } from 'polished'
import { Link } from 'react-router'
import { media } from 'assets/styles/style-utils.js'
import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js'

export const MatersLayout = styled.div` 
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

export const AuthorName = styled(Link)`
  display: inline-block; 
  font-size: ${FONTS_SIZE.fontSizeLarge};
  margin: 30px 10px 30px 10px;   
  &:hover {   
    text-shadow: 1px 1px 8px ${rgba(COLORS.colorWarmGreyTwo, 0.4)};
    z-index: 10;
  }           
`
