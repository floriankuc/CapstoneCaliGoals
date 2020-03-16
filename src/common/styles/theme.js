import { css } from 'styled-components'

export const colors = {
  black: '#121212',
  lightred: '#ef5350',
  red: '#ff1744',
  darkred: '#b71c1c',
  white: '#fff',
  lightgrey: '#bdbdbd',
  grey: '#616161',
  darkgrey: '#424242',
  lightestgrey: '#12121211',
}

export const mixins = {
  squareButton: css`
    display: block;
    width: 300px;
    text-decoration: none;
    color: ${colors.white};
    padding: 12px;
    background: ${colors.black};
    text-align: center;
    position: relative;

    &:hover:after {
      top: -6px;
      left: 6px;
    }

    &:active:after {
      top: -10px;
      left: 10px;
    }

    &:after {
      content: '';
      position: absolute;
      z-index: -1;
      background: ${colors.red};
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.1s ease-in-out;
    }
  `,

  squareButtonReverse: css`
    display: block;
    width: 240px;
    text-decoration: none;
    border: 1px solid ${colors.red};
    color: ${colors.red};
    padding: 12px;
    background: ${colors.white};
    text-align: center;
    position: relative;

    &:hover:after {
      top: -6px;
      left: 6px;
    }

    &:active:after {
      top: -10px;
      left: 10px;
    }

    &:after {
      content: '';
      position: absolute;
      z-index: -1;
      background: ${colors.red};
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.1s ease-in-out;
    }
  `,

  tileButton: css`
    font-family: Roboto, sans-serif;
    padding: 12px 0;
    background: ${colors.lightestgrey};
    color: ${colors.black};
    border: none;
    font-size: 16px;
    font-weight: 200;
    width: 100%;
    height: 100%;
    transition: all 0.05s ease-in-out;

    &:hover {
      cursor: pointer;
    }

    &.active,
    &:hover {
      background: ${colors.black};
      color: ${colors.white};
    }
  `,

  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
}
