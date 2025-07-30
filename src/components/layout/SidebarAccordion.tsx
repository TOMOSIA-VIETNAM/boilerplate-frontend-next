import { ChevronDown, ChevronUp, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import React from 'react'

export interface StakingAsset {
  name: string
  amount: string
  color: string
  icon: string
  disabled?: boolean
}

export default function SidebarAccordion({
  open,
  setOpen,
  assets,
  count
}: {
  open: boolean
  setOpen: (v: boolean) => void
  assets: StakingAsset[]
  count: number
}) {
  return (
    <div className="mt-4">
      <button
        className="flex items-center w-full gap-2 px-4 py-2 rounded-lg text-gray-200 hover:bg-[#23243a] transition group font-medium"
        onClick={() => setOpen(!open)}
      >
        <Lock className="w-5 h-5" />
        <span className="flex-1">Active Staking</span>
        <span className="ml-2 px-2 py-0.5 rounded bg-[#23243a] text-xs font-semibold text-purple-400">{count}</span>
        {open ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
      </button>
      {open && (
        <div className="mt-2 space-y-1 pl-2">
          {assets.map((asset) => (
            <div
              key={asset.name}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg transition',
                asset.disabled ? 'opacity-40 grayscale' : 'hover:bg-[#23243a]'
              )}
            >
              <img
                src={asset.icon}
                alt={asset.name}
                className={cn('w-5 h-5 rounded-full', asset.disabled && 'opacity-60')}
              />
              <span className="text-sm flex-1">{asset.name}</span>
              <span className="ml-auto text-xs font-semibold text-gray-200">{asset.amount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
