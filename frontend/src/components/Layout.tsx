import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f2f3f5]">
      <Header />
      <Outlet />
    </div>
  )
}
