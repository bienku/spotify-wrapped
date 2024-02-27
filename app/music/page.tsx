'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
    term: Term;
    label: string;
}

const TABS: Tab[] = [
    { term: 'short_term', label: 'last month' },
    { term: 'medium_term', label: 'last 6 months' },
    { term: 'long_term', label: 'all time' },
];

export default function Page() {
    return (
            <Tabs defaultValue="short_term" className="w-5/6 sm:w-2/3 h-full max-w-[975px]">
                <TabsList className="grid w-full h-max grid-cols-3">
                    {TABS.map(({ term, label }) => (
                        <TabsTrigger key={term} value={term} className="text-xs sm:text-sm">
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {TABS.map(({ term }) => (
                    <TabsContent key={term} value={term} className="h-[calc(100%-60px)] overflow-y-auto border rounded-md">
                        {/*  */}
                    </TabsContent>
                ))}
            </Tabs>
    );
}
