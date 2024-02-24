'use client';

import { useEffect } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import { useArtists } from '@/hooks/useArtists';
import ArtistItem from '@/components/ArtistItem';
import { Separator } from '@/components/ui/separator';
import ArtistItemSkeleton from '@/components/ArtistItemSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

interface ArtistsList {
    term: Term;
}

const ArtistsList: React.FC<ArtistsList> = ({ term }) => {
    const { artists, fetchArtistsByTerm } = useArtists();

    useEffect(() => {
        if (!artists[term] || artists[term].data.length === 0) {
            fetchArtistsByTerm(term);
        }
    }, [term, fetchArtistsByTerm]);

    return (
        <ScrollArea className="h-full w-full">
            <ul className="p-4">
                {artists[term].data && !artists[term].loading
                    ? artists[term].data.map((artist, index) => (
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
