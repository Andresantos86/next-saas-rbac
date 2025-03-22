'use client'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState, useTransition } from 'react'
import { singInWithEmailAndPassword } from './actions'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { useRouter } from 'next/navigation'

export default function SignInForm() {
  // const [{ errors, message, sucess }, formAction, isPending] = useActionState(
  //   singInWithEmailAndPassword,
  //   {
  //     sucess: false,
  //     message: null,
  //     errors: null,
  //   }
  // )
  const router = useRouter()
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    singInWithEmailAndPassword,
    () => {
      router.push('/')
    }
  )

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {success === false && message && (
          <Alert variant={'destructive'}>
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" name="email"></Input>
          {errors?.email && <ErrorField message={errors.email[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password"></Input>
          {errors?.password && <ErrorField message={errors.password[0]} />}
          <Link
            href="/auth/forgot-password"
            className="text-foreground text-xs font-medium hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button className="w-full" type="submit">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sing in with e-mail'
          )}
        </Button>

        <Button className="w-full" variant="link" size={'sm'} asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>

      <form action={signInWithGithub}>
        <Separator />
        <Button className="w-full" variant="outline" type="submit">
          <Image alt="" src={githubIcon} className="mr-2 size-4 dark:invert" />
          Sing in with GitHub
        </Button>
      </form>
    </div>
  )
}

const ErrorField = ({ message }: { message: string }) => {
  return (
    <p className="text-xs font-medium text-red-500 dark:text-red-400">
      {message}
    </p>
  )
}
