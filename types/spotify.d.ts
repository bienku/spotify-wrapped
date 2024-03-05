type Type = 'artists' | 'tracks';
type Term = 'short_term' | 'medium_term' | 'long_term';

interface Tab {
    term: Term;
    label: string;
}

interface Artist {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    popularity: number;
    type: 'artist';
    uri: string;
}

interface ImageObject {
    height?: number | null;
    url: string;
    width?: number | null;
}

interface Track {
    album: {
        album_type: 'album' | 'single' | 'compilation';
        artists: SimplifiedArtistObject[];
        available_markets: string[];
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        images: ImageObject[];
        name: string;
        release_date: string;
        release_date_precision: 'year' | 'month' | 'day';
        restrictions?: {
            type: 'album';
            reason: string;
        };
        type: 'album';
        uri: string;
    };
    artists: SimplifiedArtistObject[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_playable?: boolean;
    linked_from?: {
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    restrictions?: {
        name: string;
        reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: 'track';
    uri: string;
    is_local: boolean;
}

interface SimplifiedArtistObject {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
}

interface ImageObject {
    height?: number | null;
    url: string;
    width?: number | null;
}
