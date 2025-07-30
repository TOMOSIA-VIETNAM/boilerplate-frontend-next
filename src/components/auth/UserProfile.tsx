'use client'

import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

interface UserProfileProps {
  className?: string
  showEmail?: boolean
  avatarSize?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'compact' | 'detailed'
}

export function UserProfile({ className, showEmail = true, avatarSize = 'md', variant = 'default' }: UserProfileProps) {
  const { session } = useAuth()

  const avatarSizes = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const userName = session?.user?.name || 'User'
  const userEmail = session?.user?.email || 'user@example.com'
  const userImage = session?.user?.image

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {userImage ? (
          <img src={userImage} alt={userName} className={cn('rounded-full object-cover', avatarSizes[avatarSize])} />
        ) : (
          <div
            className={cn(
              'rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white font-semibold',
              avatarSizes[avatarSize]
            )}
          >
            <span className="text-xs">{getInitials(userName)}</span>
          </div>
        )}
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">{userName}</div>
          {showEmail && <div className="text-xs text-gray-500 truncate">{userEmail}</div>}
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={cn('flex items-center gap-3 p-3 rounded-lg bg-gray-50', className)}>
        {userImage ? (
          <img src={userImage} alt={userName} className={cn('rounded-full object-cover', avatarSizes[avatarSize])} />
        ) : (
          <div
            className={cn(
              'rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white font-semibold',
              avatarSizes[avatarSize]
            )}
          >
            <span className="text-sm">{getInitials(userName)}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{userName}</div>
          {showEmail && <div className="text-xs text-gray-500 truncate">{userEmail}</div>}
          <div className="text-xs text-green-600 font-medium mt-1">Online</div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {userImage ? (
        <img src={userImage} alt={userName} className={cn('rounded-full object-cover', avatarSizes[avatarSize])} />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white font-semibold',
            avatarSizes[avatarSize]
          )}
        >
          <span className="text-xs">{getInitials(userName)}</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{userName}</div>
        {showEmail && <div className="text-xs text-gray-500 truncate">{userEmail}</div>}
      </div>
    </div>
  )
}
