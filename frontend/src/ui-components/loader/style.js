import styled, { keyframes } from 'styled-components'
import { COLORS, FONTS_SIZE, SIZES } from 'assets/styles/style-vars.js'

const loaderTopOffset = '50%'
const loaderLeftOffset = '50%'
const loaderSpeed = '600ms'
const loaderLineWidth = '4px'
const loaderLineWidthMultiplier = 8
const loaderColorPrimary = COLORS.colorBlack
const loaderColorSecondary = COLORS.colorMarigold

const textDistance = '12px'

const miniOffset = `${textDistance} 0 0 0`
const tinyOffset = `0 0 0 (${SIZES.tiny} / 2)`
const smallOffset = `0 0 0 (${SIZES.small} / 2)`
const mediumOffset = `0 0 0 (${SIZES.medium} / 2)`
const largeOffset = `0 0 0 (${SIZES.large} / 2)`
const bigOffset = `0 0 0 (${SIZES.big} / 2)`
// const hugeOffset = `0 0 0 (${SIZES.huge} / 2)`;
// const massiveOffset = `0 0 0 (${SIZES.massive} / 2)`;

const animationLoader = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

export const LoaderBlock = styled.div`
    position: absolute;
    top: ${loaderTopOffset};
    left: ${loaderLeftOffset};
    margin: 0;
    text-align: center;
    z-index: 1000;
    transform: translateX(-50%) translateY(-50%);

    width: ${SIZES.medium};
    height: ${SIZES.medium};
    font-size: ${FONTS_SIZE.fontSizeLarge};
    
    &:before {
        position: absolute;
        content: "";
        top: 0;
        left: 50%;

        width: ${SIZES.medium};
        height: ${SIZES.medium};
        margin: ${mediumOffset};

        border-radius: 500rem;
        border: ${loaderLineWidth} solid ${loaderColorPrimary};
        border-left-color: ${loaderColorSecondary};

        animation: ${animationLoader} ${loaderSpeed} linear;
        animation-iteration-count: infinite;
    }
`

/*
|--------------------------------------------------------------------------
| Sizes
|--------------------------------------------------------------------------
*/
export const LoaderInline = LoaderBlock.extend`
  position: relative;
  vertical-align: middle;
  margin: 0;
  left: 0;
  top: 0;
  transform: none;
  display: inline-block;
  
    
  &.centered {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }    
`

export const LoaderMini = LoaderBlock.extend`
    width: ${SIZES.mini};
    height: ${SIZES.mini};
    font-size: ${FONTS_SIZE.fontSizeSmall};

    &:before {
        width: ${SIZES.mini};
        height: ${SIZES.mini};
        margin: ${miniOffset};
        border-width: ${SIZES.mini / loaderLineWidthMultiplier};
    }
`

export const LoaderTiny = LoaderBlock.extend`
    width: ${SIZES.tiny};
    height: ${SIZES.tiny};
    font-size: ${FONTS_SIZE.fontSizeTiny};

    &:before {
        width: ${SIZES.tiny};
        height: ${SIZES.tiny};
        margin: ${tinyOffset};
        border-width: ${SIZES.tiny / loaderLineWidthMultiplier};
    }
`

export const LoaderSmall = LoaderBlock.extend`
    width: ${SIZES.small};
    height: ${SIZES.small};
    font-size: ${FONTS_SIZE.fontSizeNormal};

    &:before {
        width: ${SIZES.small};
        height: ${SIZES.small};
        margin: ${smallOffset};
        border-width: ${SIZES.small / loaderLineWidthMultiplier};
    }
`

export const LoaderLarge = LoaderBlock.extend`
    width: ${SIZES.large};
    height: ${SIZES.large};
    font-size: ${FONTS_SIZE.fontSizeExtraLarge};

    &:before {
        width: ${SIZES.large};
        height: ${SIZES.large};
        margin: ${largeOffset};
        border-width: ${SIZES.large / loaderLineWidthMultiplier};
    }
`

export const LoaderBig = LoaderBlock.extend`
    width: ${SIZES.big};
    height: ${SIZES.big};
    font-size: ${FONTS_SIZE.fontSizeH2Small};

    &:before {
        width: ${SIZES.big};
        height: ${SIZES.big};
        margin: ${bigOffset};
        border-width: ${SIZES.big / loaderLineWidthMultiplier};
    }
`
