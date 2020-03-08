import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      closeButton={false}
      pauseOnVisibilityChange={false}
      transition={Slide}
    />
  )
}

export default Toast
