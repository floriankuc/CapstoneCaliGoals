import { createGlobalStyle } from 'styled-components/macro'
import { colors } from './theme'

const GlobalStyles = createGlobalStyle`

  *,
  *:after,
  *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    font-family: Roboto, sans-serif;
    font-weight: 200;
    background: ${colors.white};
    font-size: 18px;
    line-height: 1.6;
    overflow: hidden;
    height: 100vh;
    overflow-x: hidden;
  }

  h1 {
    font-size: 48px;
    font-family: Spartan, sans-serif;
    font-weight: 200;
    text-transform: uppercase;
    color: ${colors.black};
    margin-bottom: 24px;
  }

  h2 {
    font-size: 20px;
    font-family: Spartan, sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    margin: 40px 0 20px;
    position: relative;

    &:after{
      position:absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${colors.red};
    }
  }

  label {
    font-size: 12px;
    color: ${colors.darkgrey};
  }

  .toast{
    color: ${colors.white};
    background: ${colors.black};
    text-align: center;
  }
`

export default GlobalStyles
