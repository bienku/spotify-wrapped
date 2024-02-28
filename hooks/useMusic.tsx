'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';

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
    const [term, setTerm] = useState<Term>('short_term');
    const [music, setMusic] = useState<Music>({
        short_term: initialState,
        medium_term: initialState,
        long_term: initialState,
    });

    useEffect(() => {
        fetchMusic('tracks', term);
    }, [session, term]);

    const fetchMusicByTerm = (newTerm: Term) => setTerm(newTerm);

    const fetchMusic = async (type: Type, term: Term, limit = 50) => {
        setMusic((prev) => ({ ...prev, [term]: { ...prev[term], loading: true } }));

        if (!session || !session.accessToken) {
            const error = 'Session or access token is missing';
            setMusic((prev) => ({ ...prev, [term]: { ...prev[term], loading: false, error } }));
            return;
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${term}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
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
