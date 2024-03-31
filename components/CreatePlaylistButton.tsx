'use client';

import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { useMusic } from '@/hooks/useMusic';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

const CreatePlaylistButton = ({ term }: { term: Term }) => {
    const { data: session } = useSession();
    const { music } = useMusic();
    const { toast } = useToast();

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

    const unfollowPlaylist = async (playlistId: string) => {
        if (!session) throw new Error('No session found');

        await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
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
        try {
            const userId = await getUserId();
            const playlistId = await createPlaylist(userId);
            await addTracks(playlistId);

            toast({
                title: 'Playlist Created!',
                description: 'Your playlist has been created successfully.',
                action: (
                    <ToastAction onClick={() => unfollowPlaylist(playlistId)} altText="Undo">
                        Undo
                    </ToastAction>
                ),
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
            });
        }
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
