import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface Token extends JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
}

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string;
        user: {
            /** The user's postal address. */
            address: string;
        } & DefaultSession['user'];
    }
}
