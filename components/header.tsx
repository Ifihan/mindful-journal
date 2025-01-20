"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/journal" className="text-xl font-bold text-gray-800">
          Mindful Journal
        </Link>
        <div className="space-x-4">
          <Link href="/journal" passHref>
            <Button variant={pathname === "/journal" ? "default" : "ghost"}>Journal</Button>
          </Link>
          <Link href="/timeline" passHref>
            <Button variant={pathname === "/timeline" ? "default" : "ghost"}>Timeline</Button>
          </Link>
          <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
            Log Out
          </Button>
        </div>
      </nav>
    </header>
  )
}

