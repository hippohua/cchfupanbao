import { NavLink } from 'react-router-dom'
import { CalendarDays, Headphones, LogIn, Sun } from 'lucide-react'

export default function Header() {
  const tradeDate = new Date().toISOString().slice(0, 10)
  const navItems = [
    { label: '复盘首页', to: '/' },
    { label: '题材复盘', to: '/theme' },
    { label: '监控', to: '/monitor' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[50px] bg-[#e62427] text-white shadow-sm">
      <div className="h-full px-7 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full border-2 border-white/90 flex items-center justify-center text-sm font-bold leading-none">
              C
            </div>
            <span className="font-bold text-[22px] tracking-tight">CCH复盘宝</span>
          </NavLink>
          <nav className="flex items-center gap-3 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-[5px] transition-colors ${
                    isActive ? 'bg-[#b91f22] text-white' : 'text-white/90 hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex rounded overflow-hidden">
            <span className="bg-[#12213a] px-3 py-2 font-semibold">已收盘</span>
            <span className="bg-white text-[#1f2937] px-3 py-2">明天 09:15 开盘</span>
          </div>
          <button className="h-8 w-8 rounded bg-white/15 hover:bg-white/20 flex items-center justify-center">
            <Sun size={15} />
          </button>
          <button className="h-8 px-3 rounded bg-white/15 hover:bg-white/20 flex items-center gap-1.5">
            <Headphones size={15} />
            客服
          </button>
          <button className="h-8 px-3 rounded-full bg-white/15 hover:bg-white/20 flex items-center gap-1.5">
            <LogIn size={15} />
            登录
          </button>
          <div className="h-8 px-3 rounded bg-white/10 flex items-center gap-1.5">
            <CalendarDays size={15} />
            {tradeDate}
          </div>
        </div>
      </div>
    </header>
  )
}
