import styled from 'styled-components'
import { css } from 'styled-components'
import { colors } from './colors'

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

    &:hover:after,
    &:active:after {
      top: -6px;
      left: 6px;
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
