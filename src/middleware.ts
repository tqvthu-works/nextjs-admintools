import { auth } from '@/auth'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
}
/* import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}; */
