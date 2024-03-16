import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import AuthProvider from '@/providers/AuthProvider';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Spotify Wrapped',
    description: 'A web application that presents your Spotify music listening statistics in a visually appealing format.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <div className="max-h-screen h-screen xs:p-2 md:p-3 overflow-hidden">
                        <Header />
                        <main className="w-full h-4/5 flex justify-center mt-4">{children}</main>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
