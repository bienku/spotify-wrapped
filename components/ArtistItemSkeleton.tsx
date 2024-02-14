import { Skeleton } from '@/components/ui/skeleton';

const ArtistItemSkeleton = () => {
    return (
        <div className="flex items-center text-sm space-x-4 py-2">
            <Skeleton className="text-xs w-4 h-4 mx-1" />
            <Skeleton className="w-12 h-12 rounded-[5px]" />

            <div className="flex flex-col">
                <Skeleton className="w-24 h-4 mb-2" />
                <Skeleton className="w-14 h-4" />
            </div>
        </div>
    );
};

export default ArtistItemSkeleton;
