import React from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import { Separator } from '@/components/ui/separator';

interface ArtistsList {
    artists: any[];
}

const ArtistsList: React.FC<ArtistsList> = ({ artists }) => {
    return (
        <ScrollArea className="h-full w-full">
            <ul className="p-4">
                {artists
                    ? artists.map((artist, index) => (
                          <React.Fragment key={index}>
                              <p>{artist.name}</p>
                              {index !== 49 && <Separator />}
                          </React.Fragment>
                      ))
                    : 'Skeleton loading will be added here soon!'}
            </ul>
        </ScrollArea>
    );
};

export default ArtistsList;
