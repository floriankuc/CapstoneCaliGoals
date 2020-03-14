import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button } from '@storybook/react/demo'
import ButtonBlack from '../common/ButtonBlack'

export default {
  title: 'Button',
  component: Button,
}

export const BlackButton = () => <ButtonBlack>Button</ButtonBlack>
