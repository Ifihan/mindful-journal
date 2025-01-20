import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { content, mood } = await req.json()
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const userId = session.user.id

    const entry = await prisma.entry.create({
      data: {
        content,
        mood,
        userId,
      },
    })

    return NextResponse.json(entry)
  } catch (error) {
    return NextResponse.json({ error: "Error creating entry" }, { status: 500 })
  }
}

