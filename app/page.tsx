import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="w-5/6 sm:w-2/3 h-full max-w-[853px] space-y-3 pt-[20vh]">
            <h2 className="text-2xl font-semibold text-center xs:text-4xl sm:text-5xl lg:text-6xl">Unwrap Your Beats!</h2>
            <p className="text-sm text-center md:text-base">
                Navigate Through Your Most Played Tracks, Favorite Artists, and Dominant Genres, and Let Your Tunes Tell Your Tale
            </p>
            <div className="flex justify-center space-x-4 pt-3">
                <Button asChild>
                    <Link href="/music">Music</Link>
                </Button>
                <Button asChild>
                    <Link href="/artists">Artists</Link>
                </Button>
                <Button asChild>
                    <Link href="/genres">Genres</Link>
                </Button>
            </div>
        </div>
    );
}
