const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const port = 3000;

app.use(express.json());

// Use the LocalAuth strategy to save session data
const client = new Client({
    authStrategy: new LocalAuth()
});

let qrCodeDataUrl;
let clientStatus = 'initializing';

client.on('qr', async (qr) => {
    console.log('QR RECEIVED', qr);
    qrCodeDataUrl = await qrcode.toDataURL(qr);
    clientStatus = 'qr_received';
});

client.on('ready', () => {
    console.log('Client is ready!');
    clientStatus = 'ready';
    qrCodeDataUrl = null; // QR code is no longer needed
});

client.on('authenticated', () => {
    console.log('Client is authenticated!');
    clientStatus = 'authenticated';
});

client.on('auth_failure', (msg) => {
    console.error('AUTHENTICATION FAILURE', msg);
    clientStatus = 'auth_failure';
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
    clientStatus = 'disconnected';
    // The client will try to restore the session automatically
});

client.initialize();


// API Endpoints
app.get('/qr', (req, res) => {
    if (qrCodeDataUrl && clientStatus === 'qr_received') {
        res.json({ qrDataUrl: qrCodeDataUrl });
    } else {
        res.status(404).json({ error: 'QR code not available.' });
    }
});

app.get('/status', (req, res) => {
    res.json({ status: clientStatus });
});

app.post('/send-message', async (req, res) => {
    if (clientStatus !== 'ready') {
        return res.status(503).json({ error: 'Client is not ready.' });
    }

    const { to, message } = req.body;
    if (!to || !message) {
        return res.status(400).json({ error: 'Missing "to" or "message" in request body.' });
    }

    try {
        const chatId = `${to}@c.us`;
        await client.sendMessage(chatId, message);
        res.json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});


app.listen(port, () => {
  console.log(`WhatUBox backend listening at http://localhost:${port}`);
});
