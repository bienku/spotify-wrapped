'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import BurgerButton from '@/components/BurgerButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
    { id: 1, text: 'Music', route: '/music' },
    { id: 2, text: 'Artists', route: '/artists' },
];

const Nav = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleNav = () => setIsDrawerOpen((prevState) => !prevState);

    return (
        <nav className="flex justify-end items-center h-12 max-w-[1240px] mx-auto text-black md:justify-center">
            {/* Desktop Navigation */}
            <ul
                className={cn(
                    'hidden relative h-12 rounded-b-[var(--radius)] bg-white px-2',
                    'xs:m-2',
                    'md:flex md:items-center md:m-3',
                    'before:absolute before:-right-5 before:top-0 before:w-5 before:h-5 before:rounded-tl-[10px] before:shadow-[-5px_-5px_0_0_#fff]',
                    'after:absolute after:-left-5 after:top-0 after:w-5 after:h-5 after:rounded-tr-[10px] after:shadow-[5px_-5px_0_0_#fff]',
                )}
            >
                {navItems.map((item) => (
                    <li key={item.id}>
                        <Button variant="ghost" asChild>
                            <Link href={item.route}>{item.text}</Link>
                        </Button>
                    </li>
                ))}
                <li>
                    <Button variant="ghost" onClick={() => signOut()}>
                        Sign out
                    </Button>
                </li>
            </ul>

            {/* Mobile Burger Icon */}
            <div
                className={cn(
                    'relative text-black rounded-bl-[var(--radius)] h-12 w-12 flex items-center justify-center bg-background',
                    'md:hidden',
                    'before:absolute before:right-12 before:top-0 before:w-5 before:h-5 before:rounded-tr-[10px] before:shadow-[5px_-5px_0_0_#fff]',
                    'after:absolute after:right-0 after:top-12 after:w-5 after:h-5 after:rounded-tr-[10px] after:shadow-[5px_-5px_0_0_#fff]',
                )}
            >
                <BurgerButton isDrawerOpen={isDrawerOpen} handleNav={handleNav} />
            </div>

            {/* Mobile Navigation Drawer */}
            <ul
                className={cn(
                    'w-[60%] duration-500 fixed top-0 bottom-0 p-2 z-50',
                    'md:hidden',
                    { 'left-0 h-full bg-[#000300] ease-in-out': isDrawerOpen },
                    { 'left-[-100%] ease-in-out': !isDrawerOpen },
                )}
            >
                <h1 className="w-full text-3xl font-bold text-accent m-4">WRAPPED</h1>

                {navItems.map((item) => (
                    <li key={item.id}>
                        <Button asChild variant="ghost" className="text-white w-full justify-start" onClick={handleNav}>
                            <Link href={item.route} className={cn({ 'bg-white text-black': item.route === pathname })}>
                                {item.text}
                            </Link>
                        </Button>
                    </li>
                ))}
                <li>
                    <Button variant="ghost" className="text-white w-full justify-start" onClick={() => signOut()}>
                        Sign out
                    </Button>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
