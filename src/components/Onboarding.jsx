import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, User, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Onboarding = () => {
  const { t } = useTranslation();
  const { saveUser, setCurrentView } = useApp();
  
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const validatePhone = (phoneNumber) => {
    // Uzbek phone format: +998XXXXXXXXXX (13 digits total)
    const cleaned = phoneNumber.replace(/\D/g, '');
    return cleaned.length === 12 && cleaned.startsWith('998');
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 5) return `+998 (${cleaned.slice(3)}`;
    if (cleaned.length <= 8) return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5)}`;
    if (cleaned.length <= 10) return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
    if (cleaned.length <= 12) return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10)}`;
    return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length === 0) {
      setPhone('');
    } else if (cleaned.length <= 13) {
      if (!cleaned.startsWith('998')) {
        setPhone(formatPhone('998' + cleaned));
      } else {
        setPhone(formatPhone(cleaned));
      }
    }
    
    if (errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    
    const cleaned = phone.replace(/\D/g, '');
    
    if (!phone) {
      setErrors({ phone: t('phone_required') });
      return;
    }
    
    if (!validatePhone(phone)) {
      setErrors({ phone: t('phone_invalid') });
      return;
    }
    
    setErrors({});
    setStep(2);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setErrors({ name: t('name_required') });
      return;
    }
    
    const userData = {
      phone: phone.replace(/\D/g, ''),
      name: name.trim()
    };
    
    saveUser(userData);
    setCurrentView('location');
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        <div className="onboarding-header">
          <h1 className="onboarding-title">{t('welcome')}</h1>
          <p className="onboarding-subtitle">{t('welcome_subtitle')}</p>
        </div>

        {step === 1 ? (
          <form className="onboarding-form" onSubmit={handlePhoneSubmit}>
            <div className="form-group">
              <label className="form-label">
                <Phone size={20} />
                {t('phone_label')}
              </label>
              <input
                type="tel"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder={t('phone_placeholder')}
                value={phone}
                onChange={handlePhoneChange}
                maxLength={20}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <button type="submit" className="btn btn-primary">
              {t('continue')}
              <ArrowRight size={20} />
            </button>
          </form>
        ) : (
          <form className="onboarding-form" onSubmit={handleNameSubmit}>
            <div className="form-group">
              <label className="form-label">
                <User size={20} />
                {t('name_label')}
              </label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder={t('name_placeholder')}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <button type="submit" className="btn btn-primary">
              {t('continue')}
              <ArrowRight size={20} />
            </button>
          </form>
        )}

        <div className="step-indicators">
          <div className={`step-dot ${step === 1 ? 'active' : 'completed'}`}></div>
          <div className={`step-dot ${step === 2 ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
