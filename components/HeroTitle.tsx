'use client';

import { usePathname } from 'next/navigation';

import { HERO_TITLES } from '@/constants';

const HeroTitle = () => {
    const pathname = usePathname();

    return (
        <h1 className="pb-3 text-white text-4xl font-semibold sm:pb-5 md:text-5xl lg:text-6xl drop-shadow-xl">
            {HERO_TITLES[pathname]}
        </h1>
    );
};

export default HeroTitle;
