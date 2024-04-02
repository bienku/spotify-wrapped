import SpotifyProvider from 'next-auth/providers/spotify';
import NextAuth, { type Account } from 'next-auth';
import { getAuthorizationUrl, refreshAccessToken } from '@/lib/spotifyUtils';
import { type Token } from '@/types/next-auth';

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization: getAuthorizationUrl(),
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
