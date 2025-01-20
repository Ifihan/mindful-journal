import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { authOptions } from "@/lib/auth"
import PDFDocument from "pdfkit"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const userId = (session.user as Session & { id: string }).id
    const entries = await prisma.entry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    const doc = new PDFDocument()
    const buffers: any[] = []
    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers)
      return new NextResponse(pdfData, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=journal_entries.pdf",
        },
      })
    })

    doc.fontSize(25).text("Your Journal Entries", 100, 80)

    entries.forEach((entry, index) => {
      doc
        .addPage()
        .fontSize(18)
        .text(`Entry ${index + 1}`, 100, 100)
        .fontSize(14)
        .text(`Date: ${entry.createdAt.toLocaleDateString()}`, 100, 130)
        .fontSize(14)
        .text(`Mood: ${entry.mood}`, 100, 150)
        .fontSize(12)
        .text(entry.content, 100, 180)
    })

    doc.end()
  } catch (error) {
    return NextResponse.json({ error: "Error exporting entries" }, { status: 500 })
  }
}

