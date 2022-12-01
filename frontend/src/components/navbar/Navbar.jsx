import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const [openOptions, setOpenOptions] = useState(true)
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">booking-app</span>
        </Link>
        {user ? (
          <>
            <div className="username" onClick={() => setOpenOptions(prev => !prev)}>{user.username}</div>
            {openOptions && ( 
              <div className="user-options">
                  <ul>
                    <li onClick={() => setOpenOptions(prev => !prev)}>
                      <p>Logout</p>
                    </li>
                    <li onClick={() => setOpenOptions(prev => !prev)}>
                      <p>Settings</p>
                    </li>
                    <li onClick={() => setOpenOptions(prev => !prev)}>
                      <p>Profile</p>
                    </li>
                  </ul>
              </div>
            )}
          </>
         ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;