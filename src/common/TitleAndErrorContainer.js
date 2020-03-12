import React from 'react'

const TitleAndErrorContainer = ({ children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {children}
    </div>
  )
}

export default TitleAndErrorContainer
