"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, Settings } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const { user } = useUser() // Always has a user now

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center font-semibold">
          Fincos
        </Link>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <Link
            href="/listings"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/listings") && "text-primary",
            )}
          >
            Propiedades
          </Link>
          <Link
            href="/experiences"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/experiences") && "text-primary",
            )}
          >
            Experiencias
          </Link>
          <ModeToggle />

          {/* Always show the user dropdown for development */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name || "Avatar"} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/host" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard Host
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/guest" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard Guest
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/admin" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard Admin
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}

function cn(...inputs: any[]) {
  let classes = ""
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    if (input == null) continue
    const type = typeof input
    if (type === "string") {
      classes = classes + " " + input
    } else if (type === "object") {
      for (const key in input) {
        if (Object.hasOwn(input, key) && input[key]) {
          classes = classes + " " + key
        }
      }
    }
  }
  return classes.trim()
}

