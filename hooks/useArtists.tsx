'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';

interface ArtistData {
    data: any[];
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
    const [term, setTerm] = useState<Term>('short_term');
    const [artists, setArtists] = useState<Artists>({
        short_term: initialState,
        medium_term: initialState,
        long_term: initialState,
    });

    useEffect(() => {
        fetchArtists('artists', term);
    }, [session, term]);

    const fetchArtistsByTerm = (newTerm: Term) => setTerm(newTerm);

    const fetchArtists = async (type: Type, term: Term, limit = 50) => {
        setArtists((prev) => ({ ...prev, [term]: { ...prev[term], loading: true } }));

        if (!session || !session.accessToken) {
            const error = 'Session or access token is missing';
            setArtists((prev) => ({ ...prev, [term]: { ...prev[term], loading: false, error } }));
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
