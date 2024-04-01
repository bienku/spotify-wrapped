'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getTopTracksOrArtists } from '@/lib/spotifyUtils';

interface MusicData {
    data: Track[];
    loading: boolean;
    error: string | null;
}

interface Music {
    short_term: MusicData;
    medium_term: MusicData;
    long_term: MusicData;
}

interface MusicContext {
    music: Music;
    fetchMusicByTerm: (newTerm: Term) => void;
}

const initialState: MusicData = { data: [], loading: false, error: null };

const MusicContext = createContext<MusicContext | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [term, setTerm] = useState<Term>('short_term');
    const [music, setMusic] = useState<Music>({
        short_term: initialState,
        medium_term: initialState,
        long_term: initialState,
    });

    useEffect(() => {
        if (music[term].data.length > 0) return;
        fetchMusic();
    }, [session, term]);

    const fetchMusicByTerm = (newTerm: Term) => setTerm(newTerm);

    const fetchMusic = async () => {
        setMusic((prev) => ({ ...prev, [term]: { ...prev[term], loading: true } }));

        if (!session || !session.accessToken) {
            return router.push('/api/auth/signin');
        }

        try {
            const data = await getTopTracksOrArtists(session, 'tracks', term);
            setMusic((prev) => ({ ...prev, [term]: { data: data.items, loading: false, error: null } }));
        } catch (error) {
            console.error(error);
            setMusic((prev) => ({ ...prev, [term]: { ...prev[term], loading: false, error } }));
        }
    };

    return <MusicContext.Provider value={{ music, fetchMusicByTerm }}>{children}</MusicContext.Provider>;
};

export const useMusic = () => {
    const context = useContext(MusicContext);

    if (!context) {
        throw new Error('useMusic must be used within a MusicProvider');
    }

    return context;
};
