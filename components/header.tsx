"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/journal" className="text-xl font-bold text-gray-800">
          Mindful Journal
        </Link>
        <div className="space-x-4">
          <Link href="/journal" passHref>
            <Button
              variant={pathname === "/journal" ? "default" : "ghost"}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              Journal
            </Button>
          </Link>
          <Link href="/timeline" passHref>
            <Button
              variant={pathname === "/timeline" ? "default" : "outline"}
              className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
            >
              Timeline
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="border-red-500 text-red-600 hover:bg-red-50"
          >
            Log Out
          </Button>
        </div>
      </nav>
    </header>
  )
}

