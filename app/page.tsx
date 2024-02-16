import { ArtistsProvider } from '@/hooks/useArtists';
import Nav from '@/components/Nav';
import ArtistsList from '@/components/ArtistsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
    term: 'short_term' | 'medium_term' | 'long_term';
    label: string;
}

const TABS: Tab[] = [
    { term: 'short_term', label: 'last month' },
    { term: 'medium_term', label: 'last 6 months' },
    { term: 'long_term', label: 'all time' },
];

export default function Home() {
    return (
        <div className="max-h-screen h-screen xs:p-2 md:p-3 overflow-hidden">
            <div className="w-full h-1/5 bg-cover bg-no-repeat bg-[url('/hero-mobile.jpg')] sm:bg-[url('/hero-desktop.jpg')] xs:max-w-7xl xs:mx-auto xs:rounded-[var(--radius)]">
                <Nav />
            </div>

            <main className="w-full h-4/5 flex justify-center mt-4">
                <ArtistsProvider>
                    <Tabs defaultValue="short_term" className="w-5/6 sm:w-2/3 h-full max-w-[975px]">
                        <TabsList className="grid w-full h-max grid-cols-3">
                            {TABS.map(({ term, label }) => (
                                <TabsTrigger key={term} value={term} className="text-xs sm:text-sm">
                                    {label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {TABS.map(({ term }) => (
                            <TabsContent
                                key={term}
                                value={term}
                                className="h-[calc(100%-60px)] overflow-y-auto border rounded-md"
                            >
                                <ArtistsList term={term} />
                            </TabsContent>
                        ))}
                    </Tabs>
                </ArtistsProvider>
            </main>
        </div>
    );
}
