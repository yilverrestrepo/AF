import { PrismaClient } from "@prisma/client"

// Sample DATABASE_URL for development
// This is used if the DATABASE_URL environment variable is not set
const DATABASE_URL = "postgresql://postgres:password@localhost:5432/fincos?schema=public"

// Set the DATABASE_URL if it's not already set
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = DATABASE_URL
}

declare global {
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

export default prisma

