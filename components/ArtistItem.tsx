import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ArtistItem {
    artist: any;
    index: number;
}

const ArtistItem: React.FC<ArtistItem> = ({ artist, index }) => {
    return (
        <div
            className={cn('flex items-center text-sm space-x-4 py-2 hover:bg-gray-100 transition-colors', {
                'rounded-t-sm': index === 1,
                'rounded-b-sm': index === 50,
            })}
        >
            <p className="text-xs w-6 text-center">{index}</p>
            <Image
                src={artist.images[1].url}
                alt={`${artist.name} profile picture`}
                height={artist.images[1].height}
                width={artist.images[1].width}
                className="w-12 h-12 object-cover rounded-[5px]"
            />

            <div className="flex flex-col justify-between">
                <p className="mb-1">{artist.name}</p>
                <Badge variant="outline" className="max-w-max text-gray-400 font-light text-xs">
                    {artist.genres[0]}
                </Badge>
            </div>
        </div>
    );
};

export default ArtistItem;
