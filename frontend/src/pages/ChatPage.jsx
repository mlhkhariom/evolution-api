import { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatPage.css';

function ChatPage() {
  const [status, setStatus] = useState('disconnected');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/api/status');
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    const fetchQrCode = async () => {
      try {
        const response = await axios.get('/api/qr');
        setQrCodeUrl(response.data.qrDataUrl);
      } catch (error) {
        setQrCodeUrl('');
      }
    };

    const interval = setInterval(() => {
      fetchStatus();
      if (status !== 'ready') {
        fetchQrCode();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [status]);


  if (status !== 'ready') {
    return (
      <div className="login-container">
        <h1>Connect to WhatsApp</h1>
        <p>Current Status: {status}</p>
        {qrCodeUrl && (
          <div>
            <p>Scan the QR code with your phone:</p>
            <img src={qrCodeUrl} alt="QR Code" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>WhatUBox</h1>
      <p>Welcome to your WhatsApp Web Client!</p>
      {/* Chat interface will go here */}
    </div>
  );
}

export default ChatPage;
