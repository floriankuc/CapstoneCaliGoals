import firebase from '../firebase'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Scroller from '../common/Scroller'
import Navigation from './pages/Navigation'
import Data from './pages/data/Data'
import Home from './pages/home/Home'
import Path from './pages/path/Path'
import Sessions from './pages/sessions/Sessions'

const App = () => {
  const [path, setPath] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('paths')
      .onSnapshot(snapshot => {
        const path = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setPath(path)
      })
    return () => unsubscribe()
  }, [])

  return (
    <Router>
      <AppGrid>
        <Scroller>
          <Switch>
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
        </Scroller>
        <Navigation />
      </AppGrid>
    </Router>
  )
}

const AppGrid = styled.div`
  display: grid;
  padding: 12px 12px 0 12px;
  grid-template-rows: auto 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
`

export default App
