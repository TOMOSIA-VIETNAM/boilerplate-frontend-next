import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

export interface SidebarMenuItem {
  label: string
  icon: React.ElementType
  href: string
  badge?: string
  external?: boolean
}

export default function SidebarMenuGroup({ menu }: { menu: SidebarMenuItem[] }) {
  const pathname = usePathname()
  return (
    <div className="space-y-1 px-2">
      {menu.map((item) => {
        const Icon = item.icon
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors group font-medium',
              active
                ? 'bg-gradient-to-r from-purple-700/80 to-indigo-700/80 text-white shadow'
                : 'hover:bg-[#23243a] text-gray-300'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="flex-1 truncate text-base">{item.label}</span>
            {item.badge && (
              <span className="ml-2 px-2 py-0.5 rounded bg-purple-500/80 text-xs font-semibold text-white shadow-sm">
                {item.badge}
              </span>
            )}
            {item.external && <ExternalLink className="w-4 h-4 text-gray-400 ml-1" />}
          </Link>
        )
      })}
    </div>
  )
}
