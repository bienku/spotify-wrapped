import { Skeleton } from '@/components/ui/skeleton';

const ItemSkeleton = () => {
    return (
        <div className="flex items-center text-sm space-x-4 py-2">
            <Skeleton className="text-xs w-4 h-4 mx-1 bg-neutral-200" />
            <Skeleton className="w-12 h-12 rounded-[5px] bg-neutral-200" />

            <div className="flex flex-col">
                <Skeleton className="w-24 h-4 mb-2 bg-neutral-200" />
                <Skeleton className="w-14 h-4 bg-neutral-200" />
            </div>
        </div>
    );
};

export default ItemSkeleton;
