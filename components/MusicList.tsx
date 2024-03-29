'use client';

import { useEffect } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import ItemSkeleton from '@/components/ItemSkeleton';
import MusicItem from '@/components/MusicItem';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useMusic } from '@/hooks/useMusic';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface MusicList {
    term: Term;
}

const MusicList: React.FC<MusicList> = ({ term }) => {
    const { music, fetchMusicByTerm } = useMusic();

    useEffect(() => {
        if (!music[term] || music[term].data.length === 0) {
            fetchMusicByTerm(term);
        }
    }, [term, fetchMusicByTerm]);

    if (music[term].error) {
        return (
            <Alert variant="destructive" className="w-4/5 mx-auto mt-8">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{music[term].error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <ScrollArea className="h-full w-full">
            <ul className="p-4">
                {music[term].data.length > 0 && !music[term].loading
                    ? music[term].data.map((song, index) => (
                          <li key={index}>
                              <MusicItem song={song} index={index + 1} />
                              {index !== 49 && <Separator />}
                          </li>
                      ))
                    : music[term].loading &&
                      Array.from({ length: 5 }, (_, index) => (
                          <li key={index}>
                              <ItemSkeleton key={index} />
                              {index !== 4 && <Skeleton className="h-[1px] w-full shrink-0" />}
                          </li>
                      ))}
            </ul>
        </ScrollArea>
    );
};

export default MusicList;
