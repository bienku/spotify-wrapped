import { useState, useEffect } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const WIDTHS = [3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const getRandomWidth = (widths: number[]) => widths[Math.floor(Math.random() * widths.length)];

const ItemSkeleton = () => {
    const [randomWidth1, setRandomWidth1] = useState<number>(0);
    const [randomWidth2, setRandomWidth2] = useState<number>(0);

    useEffect(() => {
        setRandomWidth1(getRandomWidth(WIDTHS));
        setRandomWidth2(getRandomWidth(WIDTHS));
    }, []);

    return (
        <div className="flex items-center text-sm space-x-4 py-2">
            <Skeleton className="text-xs w-4 h-4 mx-1 bg-muted" />
            <Skeleton className="w-12 h-12 rounded-[5px] bg-muted" />

            <div className="flex flex-col">
                <Skeleton style={{ width: `${randomWidth1}rem` }} className={`h-4 mb-2 bg-muted`} />
                <Skeleton style={{ width: `${randomWidth2}rem` }} className={`h-4 bg-muted`} />
            </div>
        </div>
    );
};

export default ItemSkeleton;
