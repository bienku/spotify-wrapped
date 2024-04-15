import { useState, useEffect } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const WIDTHS = [3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const useRandomWidth = () => {
    const [randomWidth, setRandomWidth] = useState(0);

    useEffect(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 425;

        let widths = WIDTHS;
        if (isMobile) {
            widths = WIDTHS.slice(0, 6);
        }

        const randomIndex = Math.floor(Math.random() * widths.length);
        setRandomWidth(widths[randomIndex]);
    }, []);

    return randomWidth;
};

const ItemSkeleton = ({ isGenre = false }) => {
    const randomWidth1 = useRandomWidth();
    const randomWidth2 = useRandomWidth();

    return (
        <div
            className={cn('flex items-center text-sm space-x-4 py-2', {
                'py-3': isGenre,
            })}
        >
            <Skeleton className="text-xs w-4 h-4 mx-1 bg-muted flex-shrink-0" />
            {!isGenre && <Skeleton className="w-12 h-12 rounded-[5px] bg-muted flex-shrink-0" />}

            {isGenre ? (
                <div className="grid grid-cols-3 gap-1 justify-center flex-1">
                    <Skeleton style={{ width: `${randomWidth1 - 2}rem` }} className="bg-muted" />
                    <Skeleton className="h-4 w-11 bg-muted justify-self-center" />
                    <Skeleton className="h-4 w-16 bg-muted justify-self-end" />
                </div>
            ) : (
                <div className="flex flex-col">
                    <Skeleton style={{ width: `${randomWidth1}rem` }} className="h-4 mb-2 bg-muted" />
                    <Skeleton style={{ width: `${randomWidth2}rem` }} className="h-4 bg-muted" />
                </div>
            )}
        </div>
    );
};

export default ItemSkeleton;
