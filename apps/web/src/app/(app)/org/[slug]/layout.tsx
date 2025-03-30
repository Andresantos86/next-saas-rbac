import { Header } from '@/components/Header'
import { Tabs } from '@/components/tabs'

export default async function OrgLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="pt-6">
        <Header />
        <Tabs />
      </div>
      <main className="w-fill mx-auto max-w-[1200px] py-4">{children}</main>
    </div>
  )
}
