import { signInWithGithub } from '@/http/sign-in-with-girhub'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code was not found.' },
      { status: 400 }
    )
  }
  const { token } = await signInWithGithub({ code })
  const cookieValue = await cookies()
  cookieValue.set('token', token, {
    path: '/',
    maxAge: 60 * 60,
  })

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''
  return NextResponse.redirect(redirectUrl)
}
