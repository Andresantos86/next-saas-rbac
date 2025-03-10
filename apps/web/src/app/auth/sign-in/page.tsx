import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from '@/assets/github-icon.svg'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" name="email"></Input>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password"></Input>
        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
      <Button className="w-full" type="submit">
        Sing in with e-mail
      </Button>

      <Button className="w-full" variant="link" size={'sm'} asChild>
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />
      <Button className="w-full" variant="outline" type="submit">
        <Image alt="" src={githubIcon} className="mr-2 size-4 dark:invert" />
        Sing in with GitHub
      </Button>
    </form>
  )
}
