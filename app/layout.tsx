import { Inter } from "next/font/google"
import { AuthProvider } from "@/components/providers/auth-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mindful Journal",
  description: "A digital journaling web app to help users reflect on their day",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

