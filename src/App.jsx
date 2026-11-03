import './App.css'
import {useState} from 'react'
import {googleLogout} from '@react-oauth/google'

import Login from './components/Login'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

const App = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const handleLoginSuccess = async response => {
    try {
      setError('')

      const idToken = response.credential

      const result = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
      )

      if (!result.ok) {
        throw new Error('Google credential validation failed')
      }

      const userData = await result.json()

      setUser({
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      })
    } catch (err) {
      console.error(err)
      setError('Google sign-in failed. Please try again.')
    }

    const url = "https://gorest.in/public/v2/users"
    const userResponse = await fetch(url)
    const fetchedData = await userResponse.json()
    console.log(fetchedData)
  }

  const handleLogout = () => {
    googleLogout()
    setUser(null)
    setError('')
  }

  return (
    <div className="mainContainer">
      {user ? (
        <div className="appLayout">
          <Navbar user={user} onLogout={handleLogout} />
          <Dashboard user={user} />
        </div>
      ) : (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          {error && <p className="errorMessage">{error}</p>}
        </>
      )}
    </div>
  )
}

export default App
