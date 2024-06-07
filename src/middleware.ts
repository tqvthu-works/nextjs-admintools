import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
// export default () => {};
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // update matcher to exclude more http://localhost:3000/assets/img/avatars/1.jpg
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};