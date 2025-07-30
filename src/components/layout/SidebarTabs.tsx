import { cn } from '@/lib/utils'
import React from 'react'

export default function SidebarTabs({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) {
  return (
    <div className="flex gap-2 px-6 mb-5">
      <button
        className={cn(
          'flex-1 py-2 rounded-xl text-sm font-semibold transition shadow',
          tab === 'staking' ? 'bg-[#191a23] text-white shadow-md' : 'bg-transparent text-gray-400 hover:bg-[#191a23]'
        )}
        onClick={() => setTab('staking')}
      >
        Staking
      </button>
      <button
        className={cn(
          'flex-1 py-2 rounded-xl text-sm font-semibold transition shadow',
          tab === 'stablecoin' ? 'bg-[#191a23] text-white shadow-md' : 'bg-transparent text-gray-400 hover:bg-[#191a23]'
        )}
        onClick={() => setTab('stablecoin')}
      >
        Stablecoin
      </button>
    </div>
  )
}
