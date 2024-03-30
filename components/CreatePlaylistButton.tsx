'use client';

import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { useMusic } from '@/hooks/useMusic';

const CreatePlaylistButton = ({ term }: { term: Term }) => {
    const { data: session } = useSession();
    const { music } = useMusic();

    const getUserId = async () => {
        if (!session) throw new Error('No session found');

        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        const data = await response.json();
        return data.id;
    };

    const createPlaylist = async (userId: string) => {
        if (!session) throw new Error('No session found');

        let name = null;
        if (term === 'short_term') name = 'Top Tracks of the Month';
        if (term === 'medium_term') name = 'Top Tracks of the Last 6 Months';
        if (term === 'long_term') name = 'All-Time Top Tracks';

        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({ name }),
        });

        const data = await response.json();
        return data.id;
    };

    const addTracks = async (playlistId: string) => {
        if (!session) throw new Error('No session found');

        const uris = music[term].data.map((track) => track.uri);

        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({ uris }),
        });

        const data = await response.json();
    };

    const handleCreatePlaylist = async () => {
        const userId = await getUserId();
        const playlistId = await createPlaylist(userId);
        await addTracks(playlistId);
    };

    return (
        <Button
            size="icon"
            className="h-auto w-auto whitespace-nowrap rounded-md px-3 py-1 ring-offset-background transition-all hover:scale-125"
            onClick={() => handleCreatePlaylist()}
        >
            +
        </Button>
    );
};

export default CreatePlaylistButton;
