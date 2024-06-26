'use client';

import GenresList from '@/components/GenresList';
import { ArtistsProvider } from '@/hooks/useArtists';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TABS } from '@/constants';

export default function Page() {
    return (
        <ArtistsProvider>
            <Tabs defaultValue="short_term" className="w-5/6 sm:w-2/3 h-full max-w-[853px]">
                <TabsList className="grid w-full h-max grid-cols-3">
                    {TABS.map(({ term, label }) => (
                        <TabsTrigger key={term} value={term} className="text-xs sm:text-sm">
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {TABS.map(({ term }) => (
                    <TabsContent key={term} value={term} className="h-[calc(100%-60px)] overflow-y-auto border rounded-md">
                        <GenresList term={term} />
                    </TabsContent>
                ))}
            </Tabs>
        </ArtistsProvider>
    );
}
