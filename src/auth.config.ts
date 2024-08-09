import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      if (!auth?.user) {
        return false
      }
      if (request.url.includes('/login')) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/dashboard`)
      }

      return true
    },
    async redirect({ baseUrl }) {
      /* known issue https://github.com/nextauthjs/next-auth/issues/10928 */
      return baseUrl
    },
  },
  providers: [], // Add providers with an empty array for now
  debug: false,
} satisfies NextAuthConfig
