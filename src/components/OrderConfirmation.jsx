import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = ({ orderId, onNewOrder }) => {
  const { t } = useTranslation();

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="success-animation">
          <CheckCircle size={80} className="success-icon" />
        </div>
        
        <h2 className="confirmation-title">{t('order_success')}</h2>
        <p className="confirmation-subtitle">{t('thank_you')}</p>
        
        <div className="order-details">
          <div className="order-id-box">
            <span className="order-id-label">{t('order_id')}</span>
            <span className="order-id-value">{orderId}</span>
          </div>
          
          <p className="order-message">{t('order_processing')}</p>
        </div>

        <button className="btn btn-primary" onClick={onNewOrder}>
          {t('new_order')}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
