import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Clock, Phone, LogOut, X, ChevronRight, Package, Trash2, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const ProfileMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { user, orderHistory, logoutUser, clearOrderHistory } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  if (!isOpen || !user) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 12) {
      return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
    }
    return phone;
  };

  const getGoogleMapsLink = (location) => {
    if (!location || !location.latitude || !location.longitude) return null;
    return `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
  };

  const handleLogout = () => {
    logoutUser();
    onClose();
  };

  const handleClearHistory = () => {
    if (window.confirm(t('confirm_clear_history'))) {
      clearOrderHistory();
    }
  };

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="profile-header">
          <h2 className="profile-title">{t('profile')}</h2>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            {t('my_info')}
          </button>
          <button 
            className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Clock size={18} />
            {t('order_history')}
          </button>
        </div>

        {/* Content */}
        <div className="profile-content">
          {activeTab === 'profile' ? (
            <div className="profile-info">
              {/* User Avatar */}
              <div className="user-avatar">
                <User size={48} />
              </div>

              {/* User Details */}
              <div className="user-details">
                <div className="user-detail-item">
                  <div className="detail-icon">
                    <User size={20} />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">{t('name_label')}</span>
                    <span className="detail-value">{user.name}</span>
                  </div>
                </div>

                <div className="user-detail-item">
                  <div className="detail-icon">
                    <Phone size={20} />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">{t('phone_label')}</span>
                    <span className="detail-value">{formatPhone(user.phone)}</span>
                  </div>
                </div>

                <div className="user-detail-item">
                  <div className="detail-icon">
                    <Package size={20} />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">{t('total_orders')}</span>
                    <span className="detail-value">{orderHistory.length}</span>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button className="btn-logout" onClick={handleLogout}>
                <LogOut size={20} />
                {t('logout')}
              </button>
            </div>
          ) : (
            <div className="order-history">
              {orderHistory.length === 0 ? (
                <div className="no-orders">
                  <Package size={48} />
                  <h3>{t('no_orders')}</h3>
                  <p>{t('no_orders_desc')}</p>
                </div>
              ) : (
                <>
                  <div className="order-list">
                    {orderHistory.map((order, index) => (
                      <div key={index} className="order-card">
                        <div className="order-card-header">
                          <div className="order-id-badge">
                            #{order.id?.slice(-6) || `${index + 1}`.padStart(6, '0')}
                          </div>
                          <span className="order-date">{formatDate(order.date)}</span>
                        </div>
                        
                        <div className="order-items-summary">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="order-item-row">
                              <span className="item-name">{item.name}</span>
                              <span className="item-qty">x{item.quantity}</span>
                              <span className="item-price">{(item.price * item.quantity).toLocaleString()} {t('sum')}</span>
                            </div>
                          ))}
                        </div>

                        <div className="order-card-footer">
                          <div className="order-footer-left">
                            <span className="order-total-label">{t('total')}:</span>
                            <span className="order-total-value">{order.total?.toLocaleString()} {t('sum')}</span>
                          </div>
                          {getGoogleMapsLink(order.location) && (
                            <a 
                              href={getGoogleMapsLink(order.location)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="order-location-link"
                              title={t('view_location')}
                            >
                              <MapPin size={16} />
                              {t('map')}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn-clear-history" onClick={handleClearHistory}>
                    <Trash2 size={18} />
                    {t('clear_history')}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
