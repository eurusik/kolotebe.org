import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ProfileInfoCardProps {
  name: string | null
  email: string
  image: string | null
  phone: string | null
  phoneVerified: boolean
  createdAt: Date
}

export function ProfileInfoCard({
  name,
  email,
  image,
  phone,
  phoneVerified,
  createdAt,
}: ProfileInfoCardProps) {
  const userInitials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={image || ""} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
            {phone && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                {phone}
                {phoneVerified && (
                  <Badge className="text-xs">Verified</Badge>
                )}
              </p>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Member since</p>
          <p className="font-medium">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
