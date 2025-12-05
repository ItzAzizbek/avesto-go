import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ text = '' }) => {
  return (
    <div className="loading-spinner">
      <Loader2 className="spinner-icon" />
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
