import { api } from './api-client'
import { Role } from '@saas/auth'

interface MembershipResponse {
  membership: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }
}

export async function getMembership(org: string) {
  const result = await api
    .get(`organization/${org}/membership`)
    .json<MembershipResponse>()
  return result
}
