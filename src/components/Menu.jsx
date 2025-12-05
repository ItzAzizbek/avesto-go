import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { menuData, categories } from '../data/menuData';
import Header from './Header';

const Menu = ({ onCartClick }) => {
  const { t } = useTranslation();
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedItems, setAddedItems] = useState({});

  const filteredMenu = selectedCategory === 'all'
    ? menuData
    : menuData.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    addToCart(item);
    
    // Show feedback animation
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 600);
  };

  return (
    <div className="menu-container">
      <Header onCartClick={onCartClick} />
      
      <div className="menu-content">
        <h2 className="menu-title">{t('menu_title')}</h2>
        
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {t(category.name)}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredMenu.map(item => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-image">
                <div className="placeholder-image">
                  {item.name.charAt(0)}
                </div>
              </div>
              
              <div className="menu-item-content">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                
                <div className="menu-item-footer">
                  <span className="menu-item-price">
                    {item.price.toLocaleString()} {t('sum')}
                  </span>
                  
                  <button
                    className={`btn-add ${addedItems[item.id] ? 'added' : ''}`}
                    onClick={() => handleAddToCart(item)}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
