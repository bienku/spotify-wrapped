import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ArtistItem {
    song: Track;
    index: number;
}

const FIRST_INDEX = 1;
const LAST_INDEX = 50;

const MusicItem: React.FC<ArtistItem> = ({ song, index }) => {
    const songExternalUrl = song.external_urls.spotify || '';
    const songUrl = song.album.images[1].url || '';
    const songHeight = song.album.images[1].height || 0;
    const songWidth = song.album.images[1].width || 0;

    return (
        <div
            className={cn('flex items-center text-sm space-x-3 sm:space-x-4 py-2 hover:bg-muted transition-colors', {
                'rounded-t-sm': index === FIRST_INDEX,
                'rounded-b-sm': index === LAST_INDEX,
            })}
        >
            <p className="text-xs w-6 text-center flex-shrink-0">{index}</p>
            <Link href={songExternalUrl} target="_blank" className="flex-shrink-0">
                <Image
                    src={songUrl}
                    alt={`${song.name} cover picture`}
                    height={songHeight}
                    width={songWidth}
                    className="size-12 object-cover rounded-[5px]"
                />
            </Link>

            <div className="flex flex-col">
                <div className="flex space-x-2 ">
                    <p className="mb-1 font-medium">{song.name.split('(')[0].trim()}</p>
                    {song.explicit && (
                        <Badge
                            variant="outline"
                            className="max-w-max text-gray-500 font-light text-xs uppercase h-full text-[10px] leading-3"
                        >
                            <span className="md:hidden">E</span>
                            <span className="hidden md:inline">Explicit</span>
                        </Badge>
                    )}
                </div>

                <p className="text-gray-600 dark:text-gray-500 line-clamp-1 text-xs">
                    {song.artists.map((artist) => artist.name).join(', ')}
                </p>
            </div>
        </div>
    );
};

export default MusicItem;
