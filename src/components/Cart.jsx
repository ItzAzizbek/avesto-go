import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Cart = ({ onClose, onCheckout }) => {
  const { t } = useTranslation();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useApp();

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="cart-overlay">
        <div className="cart-container">
          <div className="cart-header">
            <h2 className="cart-title">{t('your_cart')}</h2>
            <button className="btn-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className="cart-empty">
            <ShoppingBag size={64} className="cart-empty-icon" />
            <h3>{t('cart_empty')}</h3>
            <p>{t('cart_empty_desc')}</p>
            <button className="btn btn-secondary" onClick={onClose}>
              {t('back_to_menu')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2 className="cart-title">{t('your_cart')}</h2>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                {item.name.charAt(0)}
              </div>
              
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">
                  {item.price.toLocaleString()} {t('sum')}
                </p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button
                    className="btn-quantity"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  
                  <span className="quantity">{item.quantity}</span>
                  
                  <button
                    className="btn-quantity"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span className="total-label">{t('total')}:</span>
            <span className="total-amount">
              {total.toLocaleString()} {t('sum')}
            </span>
          </div>

          <button className="btn btn-primary btn-checkout" onClick={onCheckout}>
            {t('place_order')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
