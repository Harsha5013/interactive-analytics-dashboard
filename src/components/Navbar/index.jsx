import './index.css'

const Navbar = ({user, onLogout}) => {
  return (
    <div className="navContainer">
      <div className="navTop">
        <h1 className="logo">Board</h1>

        <ul className="navLinks">
          <li className="active">Dashboard</li>
          <li>Analytics</li>
          <li>Projects</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className="navBottom">
        <ul className="helpLinks">
          <li>Help</li>
          <li>Contact Us</li>
        </ul>

        {user && (
          <div className="userProfile">
            {user.picture && (
              <img
                src={user.picture}
                alt="Profile"
                className="profileImage"
              />
            )}

            <div className="userInfo">
              <p className="userName">{user.name}</p>
              <p className="userEmail">{user.email}</p>
            </div>
          </div>
        )}

        <button className="logoutButton" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
