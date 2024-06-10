// src/App.js
import React, { useState } from 'react';
import './App.css';
import MembershipCounter from './modules/membershipCount/membershipCounter';
import PassCounter from './modules/passCounter/passCounter';
import Navbar from './modules/navbar/navbar';

function App() {
  const [activeComponent, setActiveComponent] = useState('MembershipCounter');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'MembershipCounter':
        return <MembershipCounter />;
      case 'PassCounter':
        return <PassCounter />;
      default:
        return <MembershipCounter />;
    }
  };

  return (
    <div>
      <Navbar onComponentChange={setActiveComponent} />
      {renderComponent()}
    </div>
  );
}

export default App;
