import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, AlertCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getCurrentPosition, checkIfInsideBuilding } from '../utils/geolocation';
import LoadingSpinner from './LoadingSpinner';

const LocationDetector = () => {
  const { t } = useTranslation();
  const { setLocation, setIsOutsideBuilding, setCurrentView } = useApp();
  const [error, setError] = useState('');
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    setIsDetecting(true);
    setError('');

    try {
      const position = await getCurrentPosition();
      console.log('Position received:', position);
      
      setLocation(position);
      
      const result = checkIfInsideBuilding(position.latitude, position.longitude);
      console.log('Building check result:', result);
      
      setIsOutsideBuilding(!result.isInside);
      
      // Route based on location
      if (!result.isInside) {
        console.log('User is outside building - routing to menu for takeout');
        // Outside buildings - go to menu for takeout
        setTimeout(() => {
          setCurrentView('menu');
        }, 500);
      } else {
        console.log('User is inside building:', result.building.name, '- routing to QR scanner');
        // Inside buildings - show QR scanner for dine-in
        setTimeout(() => {
          setCurrentView('qr-scanner');
        }, 500);
      }
      
    } catch (err) {
      console.error('Location error:', err);
      
      if (err.code === 1) {
        setError(t('location_denied'));
      } else {
        setError(t('error_general'));
      }
      
      setIsDetecting(false);
    }
  };

  const handleRetry = () => {
    detectLocation();
  };

  if (error) {
    return (
      <div className="location-container">
        <div className="location-content error">
          <AlertCircle size={64} className="error-icon" />
          <h2 className="location-title">{t('error')}</h2>
          <p className="location-text">{error}</p>
          <button className="btn btn-primary" onClick={handleRetry}>
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="location-container">
      <div className="location-content">
        <MapPin size={64} className="location-icon pulse" />
        <LoadingSpinner text={t('detecting_location')} />
      </div>
    </div>
  );
};

export default LocationDetector;
