import { useState, useEffect } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const ItemSkeleton = () => {
    const widths = [3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [randomWidth1, setRandomWidth1] = useState<number>(0);
    const [randomWidth2, setRandomWidth2] = useState<number>(0);

    useEffect(() => {
        setRandomWidth1(widths[Math.floor(Math.random() * widths.length)]);
        setRandomWidth2(widths[Math.floor(Math.random() * widths.length)]);
    }, []);

    return (
        <div className="flex items-center text-sm space-x-4 py-2">
            <Skeleton className="text-xs w-4 h-4 mx-1 bg-neutral-200" />
            <Skeleton className="w-12 h-12 rounded-[5px] bg-neutral-200" />

            <div className="flex flex-col">
                <Skeleton style={{ width: `${randomWidth1}rem` }} className={`h-4 mb-2 bg-neutral-200`} />
                <Skeleton style={{ width: `${randomWidth2}rem` }} className={`h-4 bg-neutral-200`} />
            </div>
        </div>
    );
};

export default ItemSkeleton;
