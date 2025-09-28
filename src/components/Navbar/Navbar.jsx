import React from 'react';
import logo from '../../assets/logo.png';
import coin from '../../assets/dollar-1.png';

const Navbar = ({ availableBalance }) => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <img src={logo} alt="BPL Logo" className="w-16 h-16" />
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{availableBalance.toLocaleString()} Coins</span>
          <img src={coin} alt="Coin" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
