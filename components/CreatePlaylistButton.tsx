'use client';
import { Button } from '@/components/ui/button';
const CreatePlaylistButton = ({ term }: { term: Term }) => {

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
