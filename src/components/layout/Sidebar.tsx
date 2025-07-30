'use client'

import React from 'react'
import Link from 'next/link'
import { cn, getPathWithoutLocale } from '@/lib/utils'
import { UserProfile } from '@/components/auth/UserProfile'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { useSidebar } from '@/components/providers/SidebarProvider'
import { usePathname } from 'next/navigation'
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Users,
  MessageCircle,
  Mail,
  BarChart2,
  Zap,
  TrendingUp,
  User,
  ChevronsLeft,
  ChevronsRight,
  Code
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const mainMenu = [
  { label: 'Dashboard', icon: Home, href: '/', active: true },
  { label: 'Products', icon: ShoppingBag, href: '/products' },
  { label: 'Order', icon: ShoppingCart, href: '/order' },
  { label: 'Customers', icon: Users, href: '/customers' },
  { label: 'Chat', icon: MessageCircle, href: '/chat', badge: 22 }
]
const otherMenu = [
  { label: 'Email', icon: Mail, href: '/email' },
  { label: 'Analytics', icon: BarChart2, href: '/analytics' },
  { label: 'Integration', icon: Zap, href: '/integration' },
  { label: 'Performance', icon: TrendingUp, href: '/performance' },
  { label: 'CMS Components', icon: Code, href: '/dashboard/cms-components' }
]
const accountMenu = [
  { label: 'Account', icon: User, href: '/dashboard/account' },
  { label: 'Members', icon: Users, href: '/dashboard/members' }
]

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar()
  const pathname = usePathname()

  const normalizedPath = getPathWithoutLocale(pathname)

  const isActive = (href: string) => {
    if (href === '/') return normalizedPath === '/'
    return normalizedPath.startsWith(href)
  }

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen flex flex-col select-none p-4 z-30 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out',
        isOpen ? 'w-[285px]' : 'w-[80px]'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center gap-3 mb-6 sticky top-0 bg-white z-40 rounded-lg py-2',
          !isOpen ? 'justify-center ml-auto px-1' : 'justify-start  border px-2'
        )}
      >
        <span className="inline-block w-10 h-10 bg-[#222] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">T</span>
        </span>
        {isOpen && (
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-bold text-[15px] leading-tight truncate">Tomosia Inc.</span>
            <span className="text-[11px] text-gray-400 font-medium truncate">Free Plan</span>
          </div>
        )}
        <button
          onClick={toggle}
          className={cn('p-2 rounded-lg hover:bg-gray-100 transition-colors', !isOpen && 'ml-auto')}
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? (
            <ChevronsLeft className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronsRight className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>
      {/* Main menu */}
      <div className="flex-1 flex flex-col gap-0 overflow-y-auto">
        <SidebarGroup label="MAIN MENU" showLabel={isOpen}>
          {mainMenu.map((item) => (
            <SidebarItem key={item.label} {...item} showLabel={isOpen} active={isActive(item.href)} />
          ))}
        </SidebarGroup>
        {isOpen && <Separator />}
        <SidebarGroup label="OTHER" showLabel={isOpen}>
          {otherMenu.map((item) => (
            <SidebarItem key={item.label} {...item} showLabel={isOpen} active={isActive(item.href)} />
          ))}
        </SidebarGroup>
        {isOpen && <Separator />}
        <SidebarGroup label="ACCOUNT" showLabel={isOpen}>
          {accountMenu.map((item) => (
            <SidebarItem key={item.label} {...item} showLabel={isOpen} active={isActive(item.href)} />
          ))}
        </SidebarGroup>
      </div>
      {/* Footer */}
      <div className="pt-4 border-t border-[#f1f1f3] mt-6">
        {isOpen ? (
          <div className="flex items-center gap-3">
            <UserProfile variant="compact" avatarSize="md" showEmail={true} className="flex-1" />
            <LogoutButton
              variant="ghost"
              size="icon"
              className="p-2 rounded-lg hover:bg-gray-100 hover:text-red-500"
              requireConfirmation={true}
              confirmationTitle="Confirm Logout"
              confirmationDescription="Are you sure you want to logout? You will need to sign in again to access your account."
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <LogoutButton
              variant="ghost"
              size="icon"
              className="p-2 rounded-lg hover:bg-gray-100 hover:text-red-500"
              requireConfirmation={true}
              confirmationTitle="Confirm Logout"
              confirmationDescription="Are you sure you want to logout? You will need to sign in again to access your account."
            />
            {!isOpen && <div className="text-xs text-gray-400 text-center mt-1">Logout</div>}
          </div>
        )}
      </div>
    </aside>
  )
}

function SidebarGroup({
  label,
  children,
  showLabel
}: {
  label: string
  children: React.ReactNode
  last?: boolean
  showLabel: boolean
}) {
  return (
    <div className="pb-4 pt-4">
      {showLabel && (
        <div className="pb-1 text-[10px] text-gray-400 font-semibold tracking-widest pl-1 mb-1 uppercase">{label}</div>
      )}
      <nav className="space-y-1">{children}</nav>
    </div>
  )
}

function SidebarItem({
  label,
  icon: Icon,
  href,
  badge,
  active,
  showLabel
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: number
  active?: boolean
  showLabel: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-2 py-2 transition-colors font-medium relative group',
        active
          ? 'text-[#222] font-semibold border border-[#e8e8e8] rounded-[8px] bg-transparent bg-white'
          : 'hover:bg-[#f6f6f8] text-gray-500 rounded-[8px]',
        showLabel && 'justify-center'
      )}
      title={!showLabel ? label : undefined}
    >
      <Icon className={cn('w-4 h-4 min-w-[16px] min-h-[16px]', !showLabel && 'flex-1')} />
      {showLabel && (
        <>
          <span className="flex-1 truncate text-[12px]">{label}</span>
          {badge !== undefined && (
            <span className="ml-2 px-2 py-0.5 rounded bg-primary/10 text-[11px] font-semibold text-primary shadow-sm min-w-[24px] text-center">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}
