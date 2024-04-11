'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import BurgerButton from '@/components/BurgerButton';
import { Button } from '@/components/ui/button';
import ThemeToggler from '@/components/ThemeToggler';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants';

const Nav = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const pathname = usePathname();

    const handleNav = () => setIsDrawerOpen((prevState) => !prevState);

    return (
        <nav className="flex justify-end items-center h-12 max-w-[1240px] mx-auto md:justify-center">
            {/* Desktop Navigation */}
            <ul
                className={cn(
                    'hidden relative h-12 rounded-b-[var(--radius)] bg-background px-2',
                    'xs:m-2',
                    'md:flex md:items-center md:m-3',
                    'before:absolute before:-right-5 before:top-0 before:w-5 before:h-5 before:rounded-tl-[10px] before:shadow-[-5px_-5px_0_0_#fff] dark:before:shadow-[-5px_-5px_0_0_#0c0a09]',
                    'after:absolute after:-left-5 after:top-0 after:w-5 after:h-5 after:rounded-tr-[10px] after:shadow-[5px_-5px_0_0_#fff] dark:after:shadow-[5px_-5px_0_0_#0c0a09]',
                )}
            >
                {ROUTES.map((item) => (
                    <li key={item.id}>
                        <Button variant="ghost" asChild>
                            <Link href={item.route}>{item.text}</Link>
                        </Button>
                    </li>
                ))}
                <li className="ml-6">
                    <ThemeToggler />
                </li>

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
                    'before:absolute before:right-12 before:top-0 before:w-5 before:h-5 before:rounded-tr-[10px] before:shadow-[5px_-5px_0_0_#fff] dark:before:shadow-[5px_-5px_0_0_#0c0a09]',
                    'after:absolute after:right-0 after:top-12 after:w-5 after:h-5 after:rounded-tr-[10px] after:shadow-[5px_-5px_0_0_#fff] dark:after:shadow-[5px_-5px_0_0_#0c0a09]',
                )}
            >
                <BurgerButton isDrawerOpen={isDrawerOpen} handleNav={handleNav} />
            </div>

            {/* Mobile Navigation Drawer */}
            <ul
                className={cn(
                    'w-[60%] duration-500 fixed top-0 bottom-0 p-2 space-y-3 z-50',
                    'md:hidden',
                    { 'left-0 h-full bg-[#000300] ease-in-out': isDrawerOpen },
                    { 'left-[-100%] ease-in-out': !isDrawerOpen },
                )}
            >
                <h1 className="w-full text-3xl font-bold text-accent m-4">WRAPPED</h1>

                {ROUTES.map((item) => (
                    <li key={item.id}>
                        <Button asChild variant="ghost" className="w-full justify-start" onClick={handleNav}>
                            <Link
                                href={item.route}
                                className={cn('transition-colors bg-black text-white', {
                                    'bg-white text-black': item.route === pathname,
                                })}
                            >
                                {item.text}
                            </Link>
                        </Button>
                    </li>
                ))}
                <li>
                    <ThemeToggler className="text-white w-full justify-start" />
                </li>
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
