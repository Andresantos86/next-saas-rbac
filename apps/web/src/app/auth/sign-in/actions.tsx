'use server'

import { signInWithPasswor } from '@/http/sign-in-with-password'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

const singInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-amil address.' }),
  password: z.string().min(1, { message: 'Provide your password' }),
})

export async function singInWithEmailAndPassword(data: FormData) {
  const result = singInSchema.safeParse(Object.fromEntries(data))
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }
  const { email, password } = result.data

  try {
    const { token } = await signInWithPasswor({
      email,
      password,
    })

    ;(await cookies()).set('token', token, {
      path: '/',
      maxAge: 60 * 60,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      return { success: false, message: message, errors: null }
    }
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
