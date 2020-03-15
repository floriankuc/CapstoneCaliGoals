import React from 'react'
import { useSpring, animated } from 'react-spring'

const SessionExerciseContainer = ({ children, toggled }) => {
  const { opacity, display } = useSpring({
    opacity: toggled ? 1 : 0,
    display: toggled ? 'block' : 'none',
  })

  return <animated.div style={{ opacity, display }}>{children}</animated.div>
}

export default SessionExerciseContainer
