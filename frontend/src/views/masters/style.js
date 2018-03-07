import styled from 'styled-components'
import { media } from 'assets/styles/style-utils.js'
import Select from 'react-select'

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
export const Head = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 30px 0;  
  
  h3 {
    margin-right: 20px;
    margin-bottom: 10px;
  }
  
  ${media.iphone6`
    flex-direction: column;
    align-items: flex-start;
    h3 {
      margin-right: 0;
    }
  `}
`
