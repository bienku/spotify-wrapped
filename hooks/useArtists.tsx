'use client';

import { useState, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';

interface Artists {
    short_term: any[];
    medium_term: any[];
    long_term: any[];
}

interface ArtistsContext {
    artists: Artists;
    fetchArtistsByTerm: (term: Term) => Promise<void>;
}

const ArtistsContext = createContext<ArtistsContext | undefined>(undefined);

export const ArtistsProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const [artists, setArtists] = useState<Artists>({
        short_term: [],
        medium_term: [],
        long_term: [],
    });

    const fetchArtists = async (type: Type, term: Term, limit = 50) => {
        if (!session || !session.accessToken) {
            console.error('Session or access token is missing');
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
            setArtists((prev) => ({ ...prev, [term]: data.items }));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchArtistsByTerm = async (term: Term) => fetchArtists('artists', term);

    return <ArtistsContext.Provider value={{ artists, fetchArtistsByTerm }}>{children}</ArtistsContext.Provider>;
};

export const useArtists = () => {
    const context = useContext(ArtistsContext);

    if (!context) {
        throw new Error('useArtists must be used within a ArtistsProvider');
    }

    return context;
};
