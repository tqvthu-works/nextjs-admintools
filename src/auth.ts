import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import Credentials from 'next-auth/providers/credentials'
import {
  ZodError, z, object, string,
} from 'zod'
import type { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import prismaClient from '@app/lib/prisma'

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prismaClient.user.findFirst({ where: { email } })
    return user!
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}
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
        const user = await getUser(username)
        if (!user) {
          return null
        }
        const passwordsMatch = await bcryptjs.compare(password, user!.password)
        if (passwordsMatch) {
          return { email: user!.email, name: user!.name }
        }
        return null
      },
    }),
  ],
})
