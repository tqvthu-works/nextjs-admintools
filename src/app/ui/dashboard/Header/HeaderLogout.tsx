'use client'

import { useRouter } from 'next/navigation'

export default function HeaderLogout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const logout = async () => {
    const res = await fetch('api/logout')
    if (res.status === 200) {
      router.push('/login')
    }
  }

  return (
    <div onClick={logout} onKeyDown={logout} role="button" tabIndex={0}>
      {children}
    </div>
  )
}
