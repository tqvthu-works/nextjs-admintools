import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import Credentials from 'next-auth/providers/credentials'
import { object, string } from 'zod'

export const signInSchema = object({
  username: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = await signInSchema.parseAsync(credentials)
        const response = await fetch(`${process.env.ADMIN_API_URL}/api/admin/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: username, password }),
        })
        if (!response.ok) {
          return null
        }
        const user = (await response.json()).data
        return { email: user!.email, name: user!.name }
      },
    }),
  ],
})
