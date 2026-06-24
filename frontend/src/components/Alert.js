import React, { useEffect } from 'react';
import '../styles/Alert.css';

const Alert = ({ message, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-dismiss handled by parent component
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        <span className="alert-icon">
          {type === 'success' ? '✓' : '✕'}
        </span>
        <span className="alert-message">{message}</span>
      </div>
    </div>
  );
};

export default Alert;
