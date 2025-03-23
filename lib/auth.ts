import type { NextAuthOptions } from "next-auth"
import { authOptionsMock } from "./auth-mock"

// Exportamos authOptionsMock para desarrollo o cuando no hay base de datos
export const authOptions: NextAuthOptions = authOptionsMock

