import React, { useState } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileMenu from './ProfileMenu';

const Header = ({ onCartClick }) => {
  const { getCartItemCount, user } = useApp();
  const itemCount = getCartItemCount();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <h1 className="logo">Avesto Go</h1>
          <div className="header-actions">
            <LanguageSwitcher />
            {user && (
              <button 
                className="profile-button" 
                onClick={() => setShowProfile(true)}
                title="Profile"
              >
                <User size={20} />
              </button>
            )}
            {onCartClick && itemCount > 0 && (
              <button className="cart-button" onClick={onCartClick}>
                <ShoppingCart size={24} />
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </button>
            )}
          </div>
        </div>
      </header>
      
      <ProfileMenu 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
    </>
  );
};

export default Header;
