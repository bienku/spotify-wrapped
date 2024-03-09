import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import AuthProvider from '@/providers/AuthProvider';
import Nav from '@/components/Nav';
import HeroTitle from '@/components/HeroTitle';

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
                        <div className="relative w-full h-1/5 bg-cover bg-no-repeat bg-[url('/hero-mobile.jpg')] sm:bg-[url('/hero-desktop.jpg')] xs:max-w-7xl xs:mx-auto xs:rounded-[var(--radius)]">
                            <Nav />

                            <div className="absolute bottom-0 left-0 right-0 max-w-[975px] mx-auto w-5/6 sm:w-2/3">
                                <HeroTitle />
                            </div>
                        </div>

                        <main className="w-full h-4/5 flex justify-center mt-4">{children}</main>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
