import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

// Esta es una versión simplificada de authOptions que no depende de Prisma
// para entornos de desarrollo o cuando no hay una base de datos disponible
export const authOptionsMock: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-client-secret",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "mock-facebook-client-id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "mock-facebook-client-secret",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // En un entorno de desarrollo, permitimos cualquier credencial
        if (process.env.NODE_ENV === "development") {
          return {
            id: "mock-user-id",
            name: "Usuario de Prueba",
            email: credentials?.email || "test@example.com",
            role: "USER",
          }
        }

        // En producción, esto debería verificar contra la base de datos
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "mock-nextauth-secret",
}

