import { type Session } from 'next-auth';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_BASE_URL = 'https://api.spotify.com/v1';

const createAuthorizationHeader = (accessToken: string) => ({
    Authorization: `Bearer ${accessToken}`,
});

const makeApiRequest = async (url: string, session: Session | null, method: Method = 'GET', body?: any) => {
    if (!session) throw new Error('No session found');

    const headers = createAuthorizationHeader(session.accessToken);
    const response = await fetch(url, { method, headers, body: body && JSON.stringify(body) });

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
    console.log('uris', uris);

    const body = { uris };
    await makeApiRequest(url, session, 'POST', body);
};
