'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Sidebar from './Sidebar'
import { SidebarProvider, useSidebar } from '@/components/providers/SidebarProvider'

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname.includes('/login')
  const { isOpen } = useSidebar()

  return (
    <>
      {!isLoginPage && <Sidebar />}
      <main
        className={cn(
          'min-h-screen flex justify-center items-start p-4 transition-all duration-300 ease-in-out',
          !isLoginPage && isOpen && 'ml-[285px]',
          !isLoginPage && !isOpen && 'ml-[80px]',
          !isLoginPage && 'bg-[#f7f7fa]',
          isLoginPage && 'overflow-hidden'
        )}
      >
        {!isLoginPage ? (
          <div className="max-w-[1200px] w-full bg-white rounded-[12px] min-h-screen">{children}</div>
        ) : (
          children
        )}
      </main>
    </>
  )
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </SidebarProvider>
  )
}
