export default function SidebarFooter() {
  return (
    <div className="p-4 mt-auto">
      <button className="w-full flex flex-col items-start gap-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#23243a] to-[#191a23] text-white font-semibold shadow hover:from-purple-700/80 hover:to-indigo-700/80 transition border border-[#23243a]">
        <span>Activate Super</span>
        <span className="text-xs text-gray-400 font-normal">Unlock all features on Stakent</span>
      </button>
    </div>
  )
}
