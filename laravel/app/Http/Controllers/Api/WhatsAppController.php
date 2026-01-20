<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WhatsAppController extends Controller
{
    public function getQrCode()
    {
        // In a real implementation, this would call the Node.js service
        // to get a QR code and return it as a base64 string.
        return response()->json(['qrCode' => 'mock-qr-code-base64-string']);
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'number' => 'required|string',
            'message' => 'required|string',
        ]);

        // Here, we would call the Node.js service to send the message.
        // We will also implement the mock AI response.

        $aiResponse = 'This is a mock AI response to: "' . $validated['message'] . '"';

        return response()->json([
            'message' => 'Message sent successfully (mocked).',
            'ai_reply' => $aiResponse
        ]);
    }
}
