import type { Metadata } from 'next'

import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }
  return <>{children}</>
}
