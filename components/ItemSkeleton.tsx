import { Skeleton } from '@/components/ui/skeleton';

const ItemSkeleton = () => {
    const widths = [14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60];

    const randomWidth = () => {
        const width = widths[Math.floor(Math.random() * widths.length)];
        return `w-${width}`;
    };

    return (
        <div className="flex items-center text-sm space-x-4 py-2">
            <Skeleton className="text-xs w-4 h-4 mx-1 bg-neutral-200" />
            <Skeleton className="w-12 h-12 rounded-[5px] bg-neutral-200" />

            <div className="flex flex-col">
                {/* <Skeleton className="w-24 h-4 mb-2 bg-neutral-200 w-" /> */}
                <Skeleton className={`h-4 mb-2 bg-neutral-200 ${randomWidth()}`} />
                <Skeleton className={`h-4 bg-neutral-200 ${randomWidth()} `} />
            </div>
        </div>
    );
};

export default ItemSkeleton;
