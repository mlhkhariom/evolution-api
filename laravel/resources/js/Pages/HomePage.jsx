import React from 'react';
import { Link } from '@inertiajs/react';

export default function HomePage({ auth }) {
    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen">
            <header className="bg-white shadow">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-600">WhatUBox</div>
                    <div>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="font-semibold text-gray-600 hover:text-gray-900">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="font-semibold text-gray-600 hover:text-gray-900 mr-4">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="font-semibold text-gray-600 hover:text-gray-900">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-6 py-16 text-center">
                <h1 className="text-5xl font-extrabold mb-4">Welcome to WhatUBox - By MLHK</h1>
                <p className="text-xl text-gray-600 mb-8">
                    The ultimate WhatsApp SaaS platform with AI-powered chatbots, marketing tools, and more.
                </p>
                <Link href={route('register')} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700">
                    Get Started Now
                </Link>
            </main>

            <footer className="bg-white text-center py-4 mt-16">
                <p>Developed By MLHK infotech (Hariom Vishwkama)</p>
            </footer>
        </div>
    );
}
