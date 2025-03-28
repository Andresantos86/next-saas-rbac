import type { Metadata } from 'next'

import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function AuthLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }
  return (
    <>
      {children}
      {sheet}
    </>
  )
}
