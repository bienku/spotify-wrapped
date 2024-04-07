'use client';

import { useEffect } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { useArtists } from '@/hooks/useArtists';
import ArtistItem from '@/components/ArtistItem';
import { Separator } from '@/components/ui/separator';
import ItemSkeleton from '@/components/ItemSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ArtistsList {
    term: Term;
}

const LAST_ARTIST_INDEX = 49;
const LAST_SKELETON_INDEX = 4;
const ANIMATION_DELAY = 0.055;

const ArtistsList: React.FC<ArtistsList> = ({ term }) => {
    const { artists, fetchArtistsByTerm } = useArtists();

    useEffect(() => {
        if (!artists[term] || artists[term].data.length === 0) {
            fetchArtistsByTerm(term);
        }
    }, [term, fetchArtistsByTerm]);

    if (artists[term].error) {
        return (
            <Alert variant="destructive" className="w-4/5 mx-auto mt-8">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{artists[term].error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <ScrollArea className="h-full w-full">
            <ul className="p-4">
                {artists[term].data.length > 0 && !artists[term].loading
                    ? artists[term].data.map((artist, index) => (
                          <li
                              key={artist.id}
                              className="opacity-0 animate-slide-in"
                              style={{ animationDelay: `${index * ANIMATION_DELAY}s` }}
                          >
                              <ArtistItem artist={artist} index={index + 1} />
                              {index !== LAST_ARTIST_INDEX && <Separator />}
                          </li>
                      ))
                    : artists[term].loading &&
                      Array.from({ length: 5 }, (_, index) => (
                          <li key={index}>
                              <ItemSkeleton key={index} />
                              {index !== LAST_SKELETON_INDEX && <Skeleton className="h-[1px] w-full shrink-0" />}
                          </li>
                      ))}
            </ul>
        </ScrollArea>
    );
};

export default ArtistsList;
