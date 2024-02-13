import { ScrollArea } from '@radix-ui/react-scroll-area';

import ArtistItem from '@/components/ArtistItem';
import { Separator } from '@/components/ui/separator';

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
                    : 'Skeleton loading will be added here soon!'}
            </ul>
        </ScrollArea>
    );
};

export default ArtistsList;
