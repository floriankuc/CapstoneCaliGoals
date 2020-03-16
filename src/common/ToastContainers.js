import React from 'react'
import Toast from './Toast'

const ToastContainers = () => {
  return (
    <>
      <Toast enableMultiContainer containerId={'pathDeletedContainer'} />
      <Toast enableMultiContainer containerId={'sessionSavedContainer'} />
      <Toast enableMultiContainer containerId={'pathCreatedContainer'} />
    </>
  )
}

export default ToastContainers
