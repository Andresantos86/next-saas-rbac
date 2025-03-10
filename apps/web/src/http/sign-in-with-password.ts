import { api } from './api-client'

interface SignInWithpasswordRequest {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  token: string
}

export async function signInWithPasswor(request: SignInWithpasswordRequest) {
  const result = await api
    .post('sessions/password', {
      json: request,
    })
    .json<SignInWithPasswordResponse>()
  return result
}
