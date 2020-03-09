import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Oswald:200,300,400,600|Spartan:200,300,400,500|Roboto:300,400,700&display=swap');

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
    font-weight: 300;
    background: #fff;
    font-size: 18px;
    line-height: 1.6;
    overflow: hidden;
    height: 100vh;
  }

  h1 {
    font-size: 48px;
    font-family: Spartan, sans-serif;
    margin: 84px 0 36px 0;
    font-weight: 300;
    text-transform: uppercase;
  }

  h2 {
    font-size: 20px;
    font-family: Spartan, sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    margin: 40px 0 20px;
    /* background: red; */
    position: relative;

    &:after{
      position:absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: red;
    }
  }


`
