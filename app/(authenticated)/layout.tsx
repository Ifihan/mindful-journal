import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import Header from "@/components/header"

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

