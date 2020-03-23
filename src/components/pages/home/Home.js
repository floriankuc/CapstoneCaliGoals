import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { colors, mixins } from '../../../common/styles/theme'
import TransitionWrapper from '../../../common/TransitionWrapper'
import { capitalise } from '../../../utils'
import CategoryChart from './CategoryChart'
import Header from './Header'
import { auth } from '../../../firebase'

Home.propTypes = {
  path: PropTypes.array.isRequired,
}

function Home({ path }) {
  const [categories, setCategories] = useState([])
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [emailInputLogin, setEmailInputLogin] = useState('')
  const [passwordInputLogin, setPasswordInputLogin] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user)
    } else {
      console.log('user logged out')
    }
  })

  useEffect(() => {
    path.length && setCategories(readCategories())
  }, [path])

  return (
    <TransitionWrapper>
      <HomeSection>
        <Header />
        {path.length ? (
          <>
            <p>Your current path is: {renderPathCategory()}</p>
            <CategoryChart
              categoryData={numberOfExercisesOfCategory()}
              categoryCount={countCategories()}
            />
            <StyledLink to="/sessions">
              Working out? Log your session.
            </StyledLink>
          </>
        ) : (
          <>
            <IntroText>
              Define your training path, log your workouts and track your goals.
            </IntroText>
            <StyledLink
              data-cy="createpath"
              to="/path"
              mt={!path.length ? '120px' : ''}
            >
              Create a new training path
            </StyledLink>
            <form>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
              />
              <label htmlFor="pw">pw</label>
              <input
                id="pw"
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
              />
              <button onClick={handleSignUp}>Sign up</button>
            </form>
            <button onClick={handleLogout}>Log out</button>
            <h3>Login form</h3>
            <form onSubmit={handleLogin}>
              <label htmlFor="">email</label>
              <input
                type="email"
                value={emailInputLogin}
                onChange={e => setEmailInputLogin(e.target.value)}
              />
              <label htmlFor="">pw</label>
              <input
                type="password"
                value={passwordInputLogin}
                onChange={e => setPasswordInputLogin(e.target.value)}
              />
              <button>Login</button>
            </form>
          </>
        )}
      </HomeSection>
    </TransitionWrapper>
  )

  function handleLogin(e) {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(emailInputLogin, passwordInputLogin)
      .then(cred => {
        console.log(cred.user)
        setEmailInputLogin('')
        setPasswordInputLogin('')
        // console.log('user logged in')
      })
  }

  function handleLogout(e) {
    e.preventDefault()
    auth.signOut().then(() => {
      // console.log('user logged out')
    })
  }

  function handleSignUp(e) {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(emailInput, passwordInput)
      .then(cred => {
        console.log(cred)
        setEmailInput('')
        setPasswordInput('')
      })
  }

  function readCategories() {
    return path[0].selectedExercisesAreGoals.map(path => path.category)
  }

  function renderPathCategory() {
    return <CategorySpan>{capitalise(path[0].category)}</CategorySpan>
  }

  function numberOfExercisesOfCategory() {
    const countedCategories = {}
    categories.map(
      category =>
        (countedCategories[category] = (countedCategories[category] || 0) + 1)
    )
    const categoryValues = Object.values(countedCategories)
    return categoryValues
  }

  function countCategories() {
    const countedCategories = [...new Set(categories)]
    return countedCategories
  }
}

const IntroText = styled.p`
  text-align: center;
  margin-top: 100px;
  width: 300px;
`

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding: 50px 0;
`

const StyledLink = styled(Link)`
  margin-top: ${props => props.mt};
  ${mixins.squareButton};
`

const CategorySpan = styled.span`
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background: ${colors.red};
    position: absolute;
    bottom: -4px;
    left: 0;
  }
`

export default Home
