import { Filter } from 'lucide-react'
import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

export default function Header() {
  return (
    <div className="flex items-center justify-between px-10 py-4 border-b border-[#ececf1] sticky top-0 z-10 mb-4 bg-white rounded-t-lg">
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            className="border border-[#ececf1] rounded-lg px-4 py-2 text-xs text-gray-700 focus:outline-none w-64 shadow-sm"
            placeholder="Search"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        <Button variant="outline" className="ml-2 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full bg-[#f6f6f8] border-2 border-white text-gray-400"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Button className="flex items-center gap-2">
          <span>Export</span>
        </Button>
        <Button variant="secondary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add Widget</span>
        </Button>
      </div>
    </div>
  )
}
