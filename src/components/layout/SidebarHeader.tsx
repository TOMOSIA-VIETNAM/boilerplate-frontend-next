export default function SidebarHeader() {
  return (
    <div className="flex flex-col items-start gap-1 px-6 pt-7 pb-4 select-none">
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block w-9 h-9 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-lg shadow-lg mr-2" />
        <span className="font-extrabold text-2xl tracking-tight leading-none">
          Stakent<sup className="ml-1 text-xs font-normal text-gray-400 align-top">®</sup>
        </span>
      </div>
      <span className="text-xs text-gray-400 font-medium pl-1">Top Staking Assets</span>
    </div>
  )
}
