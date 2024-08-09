'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

// eslint-disable-next-line consistent-return
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        case 'CallbackRouteError':
          return 'Invalid username or password.'
        default:
          return 'Something went wrong.!!!!'
      }
    }
    throw error
  }
}
