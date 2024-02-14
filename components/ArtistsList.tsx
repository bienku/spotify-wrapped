import { ScrollArea } from '@radix-ui/react-scroll-area';

import ArtistItem from '@/components/ArtistItem';
import { Separator } from '@/components/ui/separator';
import ArtistItemSkeleton from '@/components/ArtistItemSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

interface ArtistsList {
    artists: any[];
    loading: boolean;
}

const ArtistsList: React.FC<ArtistsList> = ({ artists, loading }) => {
    return (
        <ScrollArea className="h-full w-full">
            <ul className="p-4">
                {artists && !loading
                    ? artists.map((artist, index) => (
                          <li key={index}>
                              <ArtistItem artist={artist} index={index + 1} />
                              {index !== 49 && <Separator />}
                          </li>
                      ))
                    : Array.from({ length: 5 }, (_, index) => (
                          <li key={index}>
                              <ArtistItemSkeleton key={index} />
                              {index !== 4 && <Skeleton className="h-[1px] w-full shrink-0" />}
                          </li>
                      ))}
            </ul>
        </ScrollArea>
    );
};

export default ArtistsList;
