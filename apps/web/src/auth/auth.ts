import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'
import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  const cookieValue = await cookies()
  return !!cookieValue.get('token')?.value
}

export async function getCurrentOrg() {
  const cookieValue = await cookies()
  return cookieValue.get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }
  const { membership } = await getMembership(org)
  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()
  if (!membership) {
    return null
  }
  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function auth() {
  const cookieValue = await cookies()
  const token = cookieValue.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
