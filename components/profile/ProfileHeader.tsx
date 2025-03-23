import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { UserProfile } from "@/types/user"
import { Edit } from "lucide-react"

interface ProfileHeaderProps {
  user: UserProfile
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.image || undefined} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600 mt-1">
          Miembro desde {user.memberSince}
          {user.role === "HOST" && " • Anfitrión"}
        </p>
      </div>

      <Button className="flex items-center gap-2">
        <Edit className="h-4 w-4" />
        Editar perfil
      </Button>
    </div>
  )
}

