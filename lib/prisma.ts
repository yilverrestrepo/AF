import { PrismaClient } from "@prisma/client"

// Evitar múltiples instancias de PrismaClient en desarrollo
// Ver: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

declare global {
  var prisma: PrismaClient | undefined
}

const prismadb = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.prisma = prismadb

export default prismadb

