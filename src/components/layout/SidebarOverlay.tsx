'use client'

import { useSidebar } from '@/components/providers/SidebarProvider'
import { cn } from '@/lib/utils'

export function SidebarOverlay() {
  const { isOpen, close } = useSidebar()

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/20 z-20 lg:hidden transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={close}
    />
  )
}
