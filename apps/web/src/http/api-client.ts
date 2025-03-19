import ky from 'ky'
import { CookiesFn, getCookie } from 'cookies-next'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          cookieStore = serverCookies
        }
        const token = getCookie('token', { cookies: cookieStore })

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
