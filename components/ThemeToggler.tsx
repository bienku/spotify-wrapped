import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ThemeToggler = ({ className }: { className?: string }) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const currentTheme = theme === 'light' ? 'dark' : 'light';

    return (
        <Button variant="ghost" onClick={() => setTheme(currentTheme)} className={cn('capitalize', className)}>
            {currentTheme}
        </Button>
    );
};

export default ThemeToggler;
