import './index.css'
import {GoogleLogin} from '@react-oauth/google'

const Login = ({onLoginSuccess}) => {
  return (
    <div className="mainContainer">
      <div className="logoContainer">
        <h1>Board</h1>
      </div>

      <div className="signupContainer">
        <div className="formContainer">
          <h1>Sign in</h1>
          <p>Sign in to your account</p>

          <div className="buttonContainer">
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={() => {
                console.error('Google sign-in failed')
              }}
              text="signin_with"
              shape="rectangular"
              theme="outline"
              size="large"
            />

            <button
              type="button"
              className="OAuthButton"
              onClick={() => {
                alert('Apple sign-in is not implemented yet.')
              }}
            >
              Sign in with Apple
            </button>
          </div>

          <form className="form" onSubmit={event => event.preventDefault()}>
            <label htmlFor="email" className="formPara">
              Email address
            </label>

            <input
              className="input"
              id="email"
              type="email"
              placeholder="Enter email"
            />

            <label htmlFor="password" className="formPara">
              Password
            </label>

            <input
              className="input"
              id="password"
              type="password"
              placeholder="Enter password"
            />

            <a href="#">
              <p className="formPara">Forgot password?</p>
            </a>

            <button type="submit" className="signInButton">
              Sign in
            </button>
          </form>

          <p className="formPara">
            Don't have an account? <a href="#">Register here</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login