import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../styles/globals.css';
import AuthProvider from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Spotify Wrapped',
    description:
        'A web application that presents your Spotify music listening statistics in a visually appealing format.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </AuthProvider>
    );
}
