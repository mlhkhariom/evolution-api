import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function CustomerDashboardPage({ auth }) {
    const [qrCode, setQrCode] = useState('');
    const [aiApiKey, setAiApiKey] = useState(auth.user.aiApiKey || '');
    const [aiPrompt, setAiPrompt] = useState(auth.user.aiPrompt || '');

    useEffect(() => {
        // Fetch QR code from the backend
        axios.get(route('api.whatsapp.qr'))
            .then(response => {
                setQrCode(response.data.qrCode);
            })
            .catch(error => {
                console.error('Error fetching QR code:', error);
            });
    }, []);

    const handleSettingsUpdate = (e) => {
        e.preventDefault();
        axios.put(route('api.user.update'), {
            aiApiKey,
            aiPrompt,
        }).then(response => {
            alert('Settings updated successfully!');
        }).catch(error => {
            alert('Failed to update settings.');
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customer Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">WhatsApp QR Code</h3>
                        {qrCode ? (
                            <img src={`data:image/png;base64,${qrCode}`} alt="WhatsApp QR Code" />
                        ) : (
                            <p>Loading QR Code...</p>
                        )}
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Chatbot Settings</h3>
                        <form onSubmit={handleSettingsUpdate}>
                            <div className="mb-4">
                                <label htmlFor="aiApiKey" className="block text-sm font-medium text-gray-700">AI API Key</label>
                                <input
                                    type="text"
                                    id="aiApiKey"
                                    value={aiApiKey}
                                    onChange={(e) => setAiApiKey(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="aiPrompt" className="block text-sm font-medium text-gray-700">Custom AI Prompt</label>
                                <textarea
                                    id="aiPrompt"
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                Save Settings
                            </button>
                        </form>
                    </div>
                </div>
            </div>
             <footer className="bg-white text-center py-4 mt-16">
                <p>Developed By MLHK infotech (Hariom Vishwkama)</p>
            </footer>
        </AuthenticatedLayout>
    );
}
