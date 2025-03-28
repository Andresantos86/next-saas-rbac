import { Header } from '@/components/Header'

export default async function OrgLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="pt-6">
        <Header />
      </div>
      <main className="w-fill mx-auto max-w-[1200px] py-4">{children}</main>
    </div>
  )
}
