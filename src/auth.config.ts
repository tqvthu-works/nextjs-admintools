import type { NextAuthConfig } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Next } from 'react-bootstrap/esm/PageItem';
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      if (!auth?.user) {
        return false;
      }
      if (request.url.includes('/login')) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/dashboard`);
      }
      
      return true;
    },
    async redirect({ url, baseUrl }) {
      /* known issue https://github.com/nextauthjs/next-auth/issues/10928 */
      return baseUrl
    },
  },
  providers: [], // Add providers with an empty array for now
  debug: false,
} satisfies NextAuthConfig;