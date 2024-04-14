import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import ItemSkeleton, { GenreSkeleton } from '@/components/ItemSkeleton';
import GenreItem from '@/components/GenreItem';
import { useArtists } from '@/hooks/useArtists';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const LAST_GENRE_INDEX = 19;
const LAST_SKELETON_INDEX = 4;
const ANIMATION_DELAY = 0.055;

const countOccurrences = (strings: string[]): Map<string, number> => {
    return strings.reduce((acc, str) => {
        acc.set(str, (acc.get(str) || 0) + 1);
        return acc;
    }, new Map<string, number>());
};

const GenresList = ({ term }: { term: Term }) => {
    const [genres, setGenres] = useState<Array<[string, number]>>([]);
    const [totalGenresAmount, setTotalGenresAmount] = useState(0);
    const { artists, fetchArtistsByTerm } = useArtists();

    useEffect(() => {
        if (!artists[term] || artists[term].data.length === 0) {
            fetchArtistsByTerm(term);
        } else {
            const allGenres = artists[term].data.flatMap((artist) => artist.genres);
            setTotalGenresAmount(allGenres.length);

            const countedGenres = countOccurrences(allGenres);
            const counedGenresArray = Array.from(countedGenres.entries());
            const sortedGenres = counedGenresArray.sort((a, b) => b[1] - a[1]);
            setGenres(sortedGenres.slice(0, LAST_GENRE_INDEX + 1));
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
                {artists[term].data.length > 0 && !artists[term].loading && genres.length > 0
                    ? genres.map(([genre, count], index) => (
                          <li
                              key={genre}
                              className="opacity-0 animate-slide-in"
                              style={{ animationDelay: `${index * ANIMATION_DELAY}s` }}
                          >
                              <GenreItem genre={genre} count={count} totalGenresAmount={totalGenresAmount} index={index} />
                              {index !== LAST_GENRE_INDEX && <Separator />}
                          </li>
                      ))
                    : artists[term].loading &&
                      Array.from({ length: LAST_SKELETON_INDEX + 1 }, (_, index) => (
                          <li key={index}>
                              <GenreSkeleton key={index} />
                              {index !== LAST_SKELETON_INDEX && <Skeleton className="h-[1px] w-full shrink-0" />}
                          </li>
                      ))}
            </ul>
        </ScrollArea>
    );
};

export default GenresList;
