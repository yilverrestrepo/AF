import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import LogoutButton from "./LogoutButton"

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Nextbnb
        </Link>

        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/properties" className="hover:text-gray-500">
                Properties
              </Link>
            </li>
            {session?.user ? (
              <>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={session.user.image as string} />
                        <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/properties/create">List property</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {session?.user && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/messages">Mensajes</Link>
                          </DropdownMenuItem>

                          {/* Solo mostrar para anfitriones */}
                          {session.user.role === "HOST" && (
                            <DropdownMenuItem asChild>
                              <Link href="/dashboard/analytics">Análisis</Link>
                            </DropdownMenuItem>
                          )}
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogoutButton />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login">
                  <Button>Sign In</Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

