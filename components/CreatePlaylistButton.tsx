'use client';

import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { useMusic } from '@/hooks/useMusic';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { getUserId, createPlaylist, addTracks, unfollowPlaylist } from '@/lib/spotifyUtils';

const CreatePlaylistButton = ({ term }: { term: Term }) => {
    const { data: session } = useSession();
    const { music } = useMusic();
    const { toast } = useToast();

    const handleCreatePlaylist = async () => {
        try {
            const userId = await getUserId(session);
            const playlistId = await createPlaylist(session, userId, term);

            const uris = music[term].data.map((track) => track.uri);
            await addTracks(session, playlistId, uris);

            toast({
                title: 'Playlist Created!',
                description: 'Your playlist has been created successfully.',
                action: (
                    <ToastAction onClick={() => unfollowPlaylist(session, playlistId)} altText="Undo">
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
