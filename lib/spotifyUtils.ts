import { type Session } from 'next-auth';
import { type Token } from '@/types/next-auth';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_BASE_URL = 'https://api.spotify.com/v1';
const ACCOUNTS_BASE_URL = 'https://accounts.spotify.com';

const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-top-read',
    'playlist-modify-public',
    'playlist-modify-private',
].join(',');

const createAuthorizationHeader = (accessToken: string) => ({
    Authorization: `Bearer ${accessToken}`,
});

const makeApiRequest = async (
    url: string,
    session: Session | null,
    method: Method = 'GET',
    body?: any,
    header?: { [key: string]: string },
) => {
    if (!session) throw new Error('No session found');

    const defaultHeader = createAuthorizationHeader(session.accessToken);
    const response = await fetch(url, {
        method,
        headers: header ?? defaultHeader,
        body: body && JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return await response.json();
    } else {
        return null;
    }
};

export const getTopTracksOrArtists = async (session: Session | null, type: Type, term: Term, limit = 50) => {
    const url = `${API_BASE_URL}/me/top/${type}?time_range=${term}&limit=${limit}`;
    return await makeApiRequest(url, session);
};

export const getUserId = async (session: Session | null) => {
    const url = `${API_BASE_URL}/me`;
    const data = await makeApiRequest(url, session);
    return data.id;
};

export const createPlaylist = async (session: Session | null, userId: string, term: Term) => {
    const name: Record<Term, string> = {
        short_term: 'Top Tracks of the Month',
        medium_term: 'Top Tracks of the Last 6 Months',
        long_term: 'All-Time Top Tracks',
    };

    const url = `${API_BASE_URL}/users/${userId}/playlists`;
    const body = { name: name[term] };
    const data = await makeApiRequest(url, session, 'POST', body);
    return data.id;
};

export const unfollowPlaylist = async (session: Session | null, playlistId: string) => {
    const url = `${API_BASE_URL}/playlists/${playlistId}/followers`;
    await makeApiRequest(url, session, 'DELETE');
};

export const addTracks = async (session: Session | null, playlistId: string, uris: string[]) => {
    const url = `${API_BASE_URL}/playlists/${playlistId}/tracks`;

    const body = { uris };
    await makeApiRequest(url, session, 'POST', body);
};

export const refreshAccessToken = async (token: Token) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');

    if (typeof token.refreshToken === 'string') {
        params.append('refresh_token', token.refreshToken);
    } else {
        throw new Error('Refresh token is not a string');
    }

    const clientCredentials = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
    const base64Credentials = Buffer.from(clientCredentials).toString('base64');

    const url = `${ACCOUNTS_BASE_URL}/api/token`;
    const header = { Authorization: `Basic ${base64Credentials}` };
    const data = await makeApiRequest(url, null, 'POST', params, header);

    return {
        ...token,
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? token.refreshToken,
        accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
};

export const getAuthorizationUrl = () => {
    const params = { scope: scopes };
    const LOGIN_URL = `${ACCOUNTS_BASE_URL}/authorize?` + new URLSearchParams(params).toString();

    return LOGIN_URL;
};
