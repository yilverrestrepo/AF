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
import LanguageSwitcher from "./LanguageSwitcher"
import NotificationsDropdown from "./notifications/NotificationsDropdown"

const Header = async ({ locale }: { locale: string }) => {
  const session = await getServerSession(authOptions)

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={`/${locale}`} className="text-2xl font-bold">
          FINCAS
        </Link>

        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href={`/${locale}/properties`} className="hover:text-gray-500">
                Propiedades
              </Link>
            </li>
            {session?.user ? (
              <>
                <li>
                  <NotificationsDropdown />
                </li>
                <li>
                  <LanguageSwitcher />
                </li>
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
                        <Link href={`/${locale}/profile`}>Perfil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${locale}/properties/create`}>Publicar propiedad</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {session?.user && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href={`/${locale}/messages`}>Mensajes</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/${locale}/favorites`}>Favoritos</Link>
                          </DropdownMenuItem>

                          {/* Solo mostrar para anfitriones */}
                          {session.user.role === "HOST" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/${locale}/dashboard/analytics`}>Análisis</Link>
                            </DropdownMenuItem>
                          )}
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogoutButton locale={locale} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </>
            ) : (
              <>
                <li>
                  <LanguageSwitcher />
                </li>
                <li>
                  <Link href={`/${locale}/login`}>
                    <Button>Iniciar sesión</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

