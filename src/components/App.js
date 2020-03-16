import React, { useEffect, useState, useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  __RouterContext,
} from 'react-router-dom'
import styled from 'styled-components/macro'
import Scroller from '../common/Scroller'
import Navigation from './pages/Navigation'
import Data from './pages/data/Data'
import Home from './pages/home/Home'
import Path from './pages/path/Path'
import Sessions from './pages/sessions/Sessions'
import { getPath } from '../services'
import { useTransition, animated } from 'react-spring'
import ToastContainers from '../common/ToastContainers'

const App = () => {
  const [path, setPath] = useState([])

  const { location } = useContext(__RouterContext)
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: 'translate(100%, 0%)' },
    enter: { opacity: 1, transform: 'translate(0%, 0)' },
    leave: { opacity: 0, transform: 'translate(-100%, 0)' },
  })

  useEffect(() => {
    getPath(setPath)
  }, [])

  return (
    <AppGrid>
      <Scroller>
        <ToastContainers />
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route exact path="/">
                <Home path={path} />
              </Route>
              <Route path="/path">
                <Path path={path} />
              </Route>
              <Route path="/sessions">
                <Sessions path={path} />
              </Route>
              <Route path="/data">
                <Data path={path} />
              </Route>
            </Switch>
          </animated.div>
        ))}
      </Scroller>
      <Navigation path={path} />
    </AppGrid>
  )
}

const AppGrid = styled.main`
  display: grid;
  grid-template-rows: auto 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
`

export default App
