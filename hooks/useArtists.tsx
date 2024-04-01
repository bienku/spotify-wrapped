'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getTopTracksOrArtists } from '@/lib/spotifyUtils';

interface ArtistData {
    data: Artist[];
    loading: boolean;
    error: string | null;
}

interface Artists {
    short_term: ArtistData;
    medium_term: ArtistData;
    long_term: ArtistData;
}

interface ArtistsContext {
    artists: Artists;
    fetchArtistsByTerm: (newTerm: Term) => void;
}

const initialState: ArtistData = { data: [], loading: false, error: null };

const ArtistsContext = createContext<ArtistsContext | undefined>(undefined);

export const ArtistsProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [term, setTerm] = useState<Term>('short_term');
    const [artists, setArtists] = useState<Artists>({
        short_term: initialState,
        medium_term: initialState,
        long_term: initialState,
    });

    useEffect(() => {
        if (artists[term].data.length > 0) return;
        fetchArtists();
    }, [session, term]);

    const fetchArtistsByTerm = (newTerm: Term) => setTerm(newTerm);

    const fetchArtists = async () => {
        setArtists((prev) => ({ ...prev, [term]: { ...prev[term], loading: true } }));

        if (!session || !session.accessToken) {
            return router.push('/api/auth/signin');
        }

        try {
            const data = await getTopTracksOrArtists(session, 'artists', term);
            setArtists((prev) => ({ ...prev, [term]: { data: data.items, loading: false, error: null } }));
        } catch (error) {
            console.error(error);
            setArtists((prev) => ({ ...prev, [term]: { ...prev[term], loading: false, error } }));
        }
    };

    return <ArtistsContext.Provider value={{ artists, fetchArtistsByTerm }}>{children}</ArtistsContext.Provider>;
};

export const useArtists = () => {
    const context = useContext(ArtistsContext);

    if (!context) {
        throw new Error('useArtists must be used within a ArtistsProvider');
    }

    return context;
};
