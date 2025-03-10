import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Image from 'next/image'
import Link from 'next/link'
import githubIcon from '@/assets/github-icon.svg'

import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUpPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="name" name="name"></Input>
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email"></Input>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password"></Input>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input
          id="password_confirmation"
          type="password"
          name="password_confirmation"
        ></Input>
      </div>
      <Button className="w-full" type="submit">
        Create account
      </Button>
      <Button className="w-full" variant="link" size={'sm'} asChild>
        <Link href="/auth/sign-in">Already registred? Sign in</Link>
      </Button>
      <Separator />
      <Button className="w-full" variant="outline" type="submit">
        <Image alt="" src={githubIcon} className="mr-2 size-4 dark:invert" />
        Sing up with GitHub
      </Button>
    </form>
  )
}
