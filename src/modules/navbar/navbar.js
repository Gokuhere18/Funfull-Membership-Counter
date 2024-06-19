import React from 'react';
import './navbar.css';

function Navbar({ onComponentChange }) {
  return (
    <nav className="navbar">
      <button onClick={() => onComponentChange('MembershipCounter')}>Active Memberships</button>
      <button onClick={() => onComponentChange('PassCounter')}>Pass Counter</button>
    </nav>
  );
}

export default Navbar;