"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash, Mail, Check, X, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

// Mock data for users
const users = [
  {
    id: 1,
    name: "Laura García",
    email: "laura.garcia@example.com",
    role: "guest",
    image: "/images/avatars/avatar-1.jpg",
    isVerified: true,
    joined: "2023-05-15",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    role: "host",
    image: "/images/avatars/avatar-2.jpg",
    isVerified: true,
    joined: "2023-06-20",
  },
  {
    id: 3,
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    role: "guest",
    image: "/images/avatars/avatar-3.jpg",
    isVerified: false,
    joined: "2023-04-10",
  },
  {
    id: 4,
    name: "Miguel Pérez",
    email: "miguel.perez@example.com",
    role: "admin",
    image: "/images/avatars/avatar-4.jpg",
    isVerified: true,
    joined: "2023-07-05",
  },
  {
    id: 5,
    name: "Sofía López",
    email: "sofia.lopez@example.com",
    role: "guest",
    image: "/images/avatars/avatar-5.jpg",
    isVerified: false,
    joined: "2023-07-15",
  },
]

export default function AdminUsers() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [usersList, setUsersList] = useState(users)

  const handleDeleteUser = (id: number) => {
    // Show confirmation toast
    toast({
      title: "¿Estás seguro?",
      description: "Esta acción no se puede deshacer.",
      action: (
        <Button
          variant="destructive"
          onClick={() => {
            setUsersList(usersList.filter((u) => u.id !== id))
            toast({
              title: "Usuario eliminado",
              description: "El usuario ha sido eliminado correctamente.",
            })
          }}
        >
          Eliminar
        </Button>
      ),
    })
  }

  const handleToggleVerification = (id: number) => {
    setUsersList(usersList.map((user) => (user.id === id ? { ...user, isVerified: !user.isVerified } : user)))

    toast({
      title: "Estado actualizado",
      description: "El estado de verificación del usuario ha sido actualizado correctamente.",
    })
  }

  const filteredUsers = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold">Gestionar usuarios</h2>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o correo electrónico"
            className="pl-9 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left">
              <th className="p-2 font-semibold">Usuario</th>
              <th className="p-2 font-semibold">Correo electrónico</th>
              <th className="p-2 font-semibold">Rol</th>
              <th className="p-2 font-semibold">Verificado</th>
              <th className="p-2 font-semibold">Fecha de registro</th>
              <th className="p-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </div>
                </td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  <Badge className={user.isVerified ? "bg-green-500" : "bg-gray-500"}>
                    {user.isVerified ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                    {user.isVerified ? "Verificado" : "No verificado"}
                  </Badge>
                </td>
                <td className="p-2">{user.joined}</td>
                <td className="p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleVerification(user.id)}>
                        {user.isVerified ? "Desactivar verificación" : "Activar verificación"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/dashboard/admin/users/${user.id}/edit`} className="flex w-full">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`mailto:${user.email}`} className="flex w-full">
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar correo
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

