import NextAuth, { type Account } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

interface Token extends JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
}

const scopes = ['user-read-email', 'playlist-read-private', 'playlist-read-collaborative'].join(',');

const params = {
    scope: scopes,
};

const LOGIN_URL = 'https://accounts.spotify.com/authorize?' + new URLSearchParams(params).toString();

async function refreshAccessToken(token: Token) {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');

    if (typeof token.refreshToken === 'string') {
        params.append('refresh_token', token.refreshToken);
    } else {
        throw new Error('Refresh token is not a string');
    }

    const clientCredentials = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
    const base64Credentials = Buffer.from(clientCredentials).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${base64Credentials}`,
        },
        body: params,
    });

    const data = await response.json();
    return {
        ...token,
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? token.refreshToken,
        accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
}

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization: LOGIN_URL,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async jwt({ token, account }: { token: Token; account: Account | null }) {
            // Persist the access_token
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.accessTokenExpires = account.expires_at;
                return token;
            }

            // access token has not expired
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires * 1000) {
                return token;
            }

            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
