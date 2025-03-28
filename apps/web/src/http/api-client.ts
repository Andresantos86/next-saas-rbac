import { getCookie } from 'cookies-next'
import ky from 'ky'
import { env } from '@saas/env'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: string | undefined

        if (typeof window !== 'undefined') {
          token = getCookie('token') as string | undefined
        } else {
          const { cookies: getServerCookies } = await import('next/headers')

          const cookieStore = await getServerCookies()
          token = cookieStore.get('token')?.value
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})

/**
 *  V1
 *  if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          const token = getCookie('token', { cookies: serverCookies })
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        } else {
          const token = getCookie('token')
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        }
 */
