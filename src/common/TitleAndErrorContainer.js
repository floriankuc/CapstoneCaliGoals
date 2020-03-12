import React from 'react'

const TitleAndErrorContainer = props => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {props.children}
    </div>
  )
}

export default TitleAndErrorContainer
