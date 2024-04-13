import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ArtistItem {
    artist: Artist;
    index: number;
}

const FIRST_INDEX = 0;
const LAST_INDEX = 49;

const ArtistItem: React.FC<ArtistItem> = ({ artist, index }) => {
    const artistUrl = artist.images[1]?.url || '';
    const artistHeight = artist.images[1]?.height || 0;
    const artistWidth = artist.images[1]?.width || 0;
    const artistGenre = artist.genres[0] || 'Unknown genre';

    return (
        <div
            className={cn('flex items-center text-sm space-x-4 py-2 hover:bg-muted transition-colors', {
                'rounded-t-sm': index === FIRST_INDEX,
                'rounded-b-sm': index === LAST_INDEX,
            })}
        >
            <p className="text-xs w-6 text-center">{index + 1}</p>
            <Link href={artist.external_urls.spotify} target="_blank">
                <Image
                    src={artistUrl}
                    alt={`${artist.name} profile picture`}
                    height={artistHeight}
                    width={artistWidth}
                    className="size-12 object-cover rounded-[5px]"
                />
            </Link>

            <div className="flex flex-col justify-between">
                <p className="mb-1">{artist.name}</p>
                <Badge variant="outline" className="max-w-max text-gray-400 font-light text-xs">
                    {artistGenre}
                </Badge>
            </div>
        </div>
    );
};

export default ArtistItem;
