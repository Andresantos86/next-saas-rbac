import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSignInURL = new URL('login/oauth/authorize', 'https://github.com')
  githubSignInURL.searchParams.set('client_id', 'kjidfghhgi')
  githubSignInURL.searchParams.set(
    'redirect_url',
    'http://localhost:3000/api/auth/callback'
  )

  githubSignInURL.searchParams.set('scope', 'user')

  redirect(githubSignInURL.toString())
}
