'use client';

import { usePathname } from 'next/navigation';

const HeroTitle = () => {
    const pathname = usePathname();

    return (
        <h1 className="text-white text-4xl font-semibold md:text-5xl pb-3 sm:pb-5 mx-auto w-5/6 sm:w-2/3 max-w-[975px]">
            {pathname === '/' && 'Home'}
            {pathname === '/music' && 'Most Listened Music'}
            {pathname === '/artists' && 'Most Listened Artists'}
        </h1>
    );
};

export default HeroTitle;
