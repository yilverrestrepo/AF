import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserProfile } from "@/lib/users"
import ProfileTabs from "@/components/profile/ProfileTabs"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileInfo from "@/components/profile/ProfileInfo"

export default async function ProfilePage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${params.locale}/login?callbackUrl=/${params.locale}/profile`)
  }

  const userProfile = await getUserProfile(session.user.id)

  return (
    <div className="container mx-auto py-8">
      <ProfileHeader user={userProfile} />

      <div className="mt-6">
        <ProfileTabs locale={params.locale} activeTab="info" />
      </div>

      <div className="mt-6">
        <ProfileInfo user={userProfile} locale={params.locale} />
      </div>
    </div>
  )
}

