type Type = 'artists' | 'tracks';
type Term = 'short_term' | 'medium_term' | 'long_term';

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
