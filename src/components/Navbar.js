import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styles

const Navbar = ({ onLogout }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch role from localStorage or API
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUserRole(payload.role); // Assuming 'role' is part of the payload
    }
  }, []);

  return (
    <nav className="nav">
      <ul className="navList">
        <li className="navItem">
          <NavLink
            to="/"
            className="navLink"
            activeClassName="activeLink" // Class that will be added when the link is active
          >
            Home
          </NavLink>
        </li>

        {(userRole === 'admin' || userRole === 'proprietario') && (
          <li className="navItem">
            <NavLink
              to="/configuracao"
              className="navLink"
              activeClassName="activeLink" // Class that will be added when the link is active
            >
              Housing
            </NavLink>
          </li>
        )}

        <li className="navItem">
          <NavLink
            to="/avaliacao"
            className="navLink"
            activeClassName="activeLink" // Class that will be added when the link is active
          >
            Evaluation
          </NavLink>
        </li>

        <li className="navItem">
          <button onClick={onLogout} className="logoutButton">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
