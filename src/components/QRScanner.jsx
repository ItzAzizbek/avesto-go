import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { useApp } from '../contexts/AppContext';

const QRScanner = () => {
  const { t } = useTranslation();
  const { setCurrentView, saveDineInData } = useApp();
  
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scanner) {
        scanner.stop().catch(err => console.error('Error stopping scanner:', err));
      }
    };
  }, [scanner]);

  const startScanning = async () => {
    try {
      setError('');
      setIsScanning(true);

      const html5QrCode = new Html5Qrcode("qr-reader");
      setScanner(html5QrCode);

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure
      );
    } catch (err) {
      console.error('Error starting scanner:', err);
      setError(t('camera_permission_denied'));
      setIsScanning(false);
    }
  };

  const onScanSuccess = (decodedText) => {
    console.log('🔍 QR Code Scanned:', decodedText);
    
    // Parse QR code - supports multiple formats
    try {
      let tableID = null;
      let location = null;
      
      // Try URL format first: https://example.com?tableID=X&location=Y
      if (decodedText.includes('tableID') || decodedText.includes('location')) {
        const url = new URL(decodedText.startsWith('http') ? decodedText : `https://dummy.com?${decodedText}`);
        tableID = url.searchParams.get('tableID');
        location = url.searchParams.get('location');
        console.log('📋 Parsed as URL - tableID:', tableID, 'location:', location);
      }
      
      // Try JSON format: {"tableID": "X", "location": "Y"}
      if (!tableID && !location) {
        try {
          const json = JSON.parse(decodedText);
          tableID = json.tableID || json.table || json.table_id;
          location = json.location || json.loc;
          console.log('📋 Parsed as JSON - tableID:', tableID, 'location:', location);
        } catch (e) {
          // Not JSON, continue
        }
      }
      
      // Try simple format: tableID|location
      if (!tableID && !location && decodedText.includes('|')) {
        const parts = decodedText.split('|');
        if (parts.length >= 2) {
          tableID = parts[0].trim();
          location = parts[1].trim();
          console.log('📋 Parsed as pipe-separated - tableID:', tableID, 'location:', location);
        }
      }

      if (tableID && location) {
        console.log('✅ Valid QR - navigating to menu');
        // Save dine-in data
        saveDineInData(tableID, location);

        // Stop scanner
        if (scanner) {
          scanner.stop();
        }

        // Navigate to menu
        setCurrentView('menu');
      } else {
        console.error('❌ Invalid QR - missing tableID or location. Raw content:', decodedText);
        setError(`${t('invalid_qr')} - QR: "${decodedText.substring(0, 50)}..."`);
      }
    } catch (err) {
      console.error('❌ Error parsing QR code:', err, 'Raw content:', decodedText);
      setError(`${t('invalid_qr')} - ${err.message}`);
    }
  };

  const onScanFailure = (error) => {
    // Ignore scan failures (happens constantly while scanning)
  };

  useEffect(() => {
    // Auto-start scanning when component mounts
    startScanning();
  }, []);

  return (
    <div className="qr-scanner-container">
      <div className="qr-scanner-content">
        <div className="qr-scanner-header">
          <Camera size={48} className="qr-scanner-icon" />
          <h2 className="qr-scanner-title">{t('scan_table_qr')}</h2>
          <p className="qr-scanner-subtitle">{t('point_camera')}</p>
        </div>

        <div className="qr-scanner-wrapper">
          <div id="qr-reader" className="qr-reader"></div>
          <div className="qr-scanner-overlay">
            <div className="qr-scanner-box">
              <div className="qr-corner qr-corner-tl"></div>
              <div className="qr-corner qr-corner-tr"></div>
              <div className="qr-corner qr-corner-bl"></div>
              <div className="qr-corner qr-corner-br"></div>
            </div>
          </div>
        </div>

        {error && (
          <div className="scanner-error">
            <p className="error-text">{error}</p>
            <p className="error-hint">{t('enable_camera')}</p>
            <button className="btn btn-primary retry-btn" onClick={startScanning}>
              {t('retry')}
            </button>
          </div>
        )}

        {isScanning && !error && (
          <div className="scanning-indicator">
            <div className="scanning-pulse"></div>
            <p className="scanning-text">{t('scanning')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
