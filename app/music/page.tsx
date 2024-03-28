import { MusicProvider } from '@/hooks/useMusic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MusicList from '@/components/MusicList';
import { Button } from '@/components/ui/button';
import { TABS } from '@/constants';

export default function Page() {
    return (
        <MusicProvider>
            <Tabs defaultValue="short_term" className="w-5/6 sm:w-2/3 h-full max-w-[853px]">
                <TabsList className="grid w-full h-max grid-cols-[repeat(3,_minmax(0,_1fr)),_1.5rem] sm:grid-cols-[repeat(3,_minmax(0,_1fr)),_1.75rem] [&>*]:text-xs [&>*]:sm:text-sm">
                    {TABS.map(({ term, label }) => (
                        <TabsTrigger key={term} value={term}>
                            {label}
                        </TabsTrigger>
                    ))}
                    <Button
                        size="icon"
                        className="h-auto w-auto whitespace-nowrap rounded-md px-3 py-1 ring-offset-background transition-all hover:scale-125"
                    >
                        +
                    </Button>
                </TabsList>

                {TABS.map(({ term }) => (
                    <TabsContent key={term} value={term} className="h-[calc(100%-60px)] overflow-y-auto border rounded-md">
                        <MusicList term={term} />
                    </TabsContent>
                ))}
            </Tabs>
        </MusicProvider>
    );
}
