import { Home, TrendingUp, BarChart3, Zap, Target, Activity, LayoutDashboard, Settings, Flame, Compass, BookOpen, Award } from 'lucide-react'

const menuItems = [
  { icon: Home, label: '复盘首页', active: true },
  { icon: TrendingUp, label: '个股复盘' },
  { icon: BarChart3, label: '题材复盘' },
  { icon: Flame, label: '热点复盘' },
  { icon: Zap, label: '涨停复盘' },
  { icon: Activity, label: '短线复盘' },
  { icon: LayoutDashboard, label: '板块轮动' },
  { icon: Target, label: '竞价择时' },
  { icon: Award, label: '龙虎榜' },
  { icon: Compass, label: '大盘风云' },
  { icon: BookOpen, label: '涨停研究' },
  { icon: Settings, label: '系统设置' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-11 bottom-0 w-44 bg-white border-r border-gray-200 z-40 overflow-y-auto">
      <div className="py-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                item.active
                  ? 'sidebar-item-active font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={16} className={item.active ? 'text-red-500' : 'text-gray-400'} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
