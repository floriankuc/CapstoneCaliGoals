import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Oswald:200,300,400,600|Roboto:300,400,700&display=swap');

  *,
  *:after,
  *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    font-family: Roboto;
    font-weight: 300;
    background: #fff;
    font-size: 18px;
    line-height: 1.6;
    overflow: hidden;
    height: 100vh;
  }

  h1 {
    font-size: 60px;
    margin: 20px 0 36px 0;
    font-weight: 600;
    letter-spacing: -3px;
  }

`
