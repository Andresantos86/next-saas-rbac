import { auth } from '@/auth/auth'

export default async function Home() {
  const { user } = await auth()
  return (
    <div>
      <span>{user.name}</span>
      <span>{user.email}</span>
    </div>
  )
}
