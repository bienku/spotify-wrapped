'use client';

import useFetch from '@/hooks/useFetch';
import Nav from '@/components/Nav';
import ArtistsList from '@/components/ArtistsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
    const { data: artistsShort, loading: loadingShort } = useFetch('artists', 'short_term');
    const { data: artistsMedium, loading: loadingMedium } = useFetch('artists', 'medium_term');
    const { data: artistsLong, loading: loadingLong } = useFetch('artists', 'long_term');

    return (
        <div className="max-h-screen h-screen xs:p-2 md:p-3 overflow-hidden">
            <div className="w-full h-1/5 bg-cover bg-no-repeat bg-[url('/hero-mobile.jpg')] sm:bg-[url('/hero-desktop.jpg')] xs:max-w-7xl xs:mx-auto xs:rounded-[var(--radius)]">
                <Nav />
            </div>

            <main className="w-full h-4/5 flex justify-center mt-4">
                <Tabs defaultValue="short_term" className="w-5/6 sm:w-2/3 h-full max-w-[975px]">
                    <TabsList className="grid w-full h-max grid-cols-3">
                        <TabsTrigger value="month-1" className="text-xs sm:text-sm">
                            last month
                        </TabsTrigger>
                        <TabsTrigger value="month-6" className="text-xs sm:text-sm">
                            last 6 months
                        </TabsTrigger>
                        <TabsTrigger value="all-time" className="text-xs sm:text-sm">
                            all time
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="short_term" className="h-[calc(100%-60px)] overflow-y-auto border rounded-md">
                        <ArtistsList artists={artistsShort} loading={loadingShort} />
                    </TabsContent>

                    <TabsContent value="medium_term" className="h-[calc(100%-60px)] overflow-y-auto border rounded-md">
                        <ArtistsList artists={artistsMedium} loading={loadingMedium} />
                    </TabsContent>

                    <TabsContent value="long_term" className="h-[calc(100%-60px)] overflow-y-auto border rounded-md">
                        <ArtistsList artists={artistsLong} loading={loadingLong} />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
