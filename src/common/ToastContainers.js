import React from 'react'
import Toast from './Toast'

const ToastContainers = () => {
  return (
    <>
      <Toast enableMultiContainer containerId={'toast'} />
      {/* <Toast enableMultiContainer containerId={'sessionSavedContainer'} /> */}
      {/* <Toast enableMultiContainer containerId={'pathCreatedContainer'} /> */}
      {/* <Toast enableMultiContainer containerId={'loggedInContainer'} /> */}
      {/* <Toast enableMultiContainer containerId={'signedUpContainer'} /> */}
      {/* <Toast enableMultiContainer containerId={'loggedOutContainer'} /> */}
    </>
  )
}

export default ToastContainers
