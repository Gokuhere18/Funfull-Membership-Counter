import React from 'react';
import './navbar.css';

function Navbar({ onComponentChange }) {
  return (
    <nav className="navbar">
      <button onClick={() => onComponentChange('MembershipCounter')}>Membership Counter</button>
      <button onClick={() => onComponentChange('PassCounter')}>SummerPass Counter</button>
    </nav>
  );
}

export default Navbar;