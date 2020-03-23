import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthForms = () => {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [emailInputLogin, setEmailInputLogin] = useState('')
  const [passwordInputLogin, setPasswordInputLogin] = useState('')

  return (
    <div>
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
    </div>
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
}

export default AuthForms
