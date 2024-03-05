import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ArtistItem {
    song: Track;
    index: number;
}

const MusicItem: React.FC<ArtistItem> = ({ song, index }) => {
    const formatName = (name: string) => name.split('(')[0].trim();

    return (
        <div
            className={cn('flex items-center text-sm space-x-4 py-2 hover:bg-gray-100 transition-colors', {
                'rounded-t-sm': index === 1,
                'rounded-b-sm': index === 50,
            })}
        >
            <p className="text-xs w-6 text-center flex-shrink-0">{index}</p>
            <Link href={song.external_urls.spotify} target="_blank">
                <Image
                    src={song.album.images[1].url}
                    alt={`${song.name} profile picture`}
                    height={song.album.images[1].height as number}
                    width={song.album.images[1].width as number}
                    className="w-12 h-12 object-cover rounded-[5px]"
                />
            </Link>

            <div className="flex flex-col">
                <div className="flex space-x-2 ">
                    <p className="mb-1 font-medium">{formatName(song.name)}</p>
                    {song.explicit && (
                        <Badge
                            variant="outline"
                            className="max-w-max text-gray-500 font-light text-xs uppercase h-full text-[10px] leading-3"
                        >
                            Explicit
                        </Badge>
                    )}
                </div>

                <p className="text-gray-600 line-clamp-1">{song.artists.map((artist) => artist.name).join(', ')}</p>
            </div>
        </div>
    );
};

export default MusicItem;
