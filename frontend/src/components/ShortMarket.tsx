import { useEffect, useState } from 'react'
import type { LimitUpPoolData } from '../types'
import { api } from '../api/client'

interface ShortMarketData {
  yiZiBan: any[]
  tZiBan: any[]
  tianDiBan: any[]
  diTianBan: any[]
  fanBao: any[]
  daMian: any[]
  daChangTui: any[]
}

export default function ShortMarket() {
  const [data, setData] = useState<ShortMarketData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        // 获取涨停池数据来分类
        const pool = await api.getLimitUpPool({ size: 200 }) as LimitUpPoolData

        // 分类逻辑（基于实际数据）
        const stocks = pool.item || []
        const yiZiBan = stocks.filter((s) => s.limit_up_time === '09:30')
        const tZiBan = stocks.filter((s) => s.limit_up_time !== '09:30')

        // 其他分类需要更多数据，先模拟
        setData({
          yiZiBan,
          tZiBan,
          tianDiBan: [],
          diTianBan: [],
          fanBao: [],
          daMian: [],
          daChangTui: [],
        })
      } catch (err) {
        console.error('加载短线数据失败:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const categories = [
    { key: 'yiZiBan' as keyof ShortMarketData, label: '一字板', color: 'bg-red-700' },
    { key: 'tZiBan' as keyof ShortMarketData, label: 'T字板', color: 'bg-red-500' },
    { key: 'tianDiBan' as keyof ShortMarketData, label: '天地板', color: 'bg-gray-600' },
    { key: 'diTianBan' as keyof ShortMarketData, label: '地天板', color: 'bg-purple-600' },
    { key: 'fanBao' as keyof ShortMarketData, label: '反包', color: 'bg-orange-500' },
    { key: 'daMian' as keyof ShortMarketData, label: '大面股', color: 'bg-green-600' },
    { key: 'daChangTui' as keyof ShortMarketData, label: '大长腿', color: 'bg-amber-500' },
  ]

  const renderStockList = (stocks: any[]) => {
    if (stocks.length === 0) {
      return <span className="text-gray-400 text-sm">暂无</span>
    }
    return (
      <div className="flex flex-wrap gap-1.5">
        {stocks.map((s: any) => (
          <span
            key={s.thscode}
            className="text-xs px-2 py-0.5 bg-red-50 text-red-700 rounded border border-red-100"
          >
            {s.name}
          </span>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">短线市场总览</h3>
        </div>
        <div className="card-body">
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="short" className="card">
      <div className="card-header">
        <h3 className="card-title">短线市场总览</h3>
      </div>
      <div className="card-body">
        <div className="space-y-2">
          {categories.map((cat) => {
            const stocks = data?.[cat.key] || []
            return (
              <div key={cat.key} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className={`${cat.color} text-white text-xs px-2 py-1 rounded font-medium min-w-[60px] text-center shrink-0`}>
                  {cat.label}
                </div>
                <div className="flex-1 min-w-0">
                  {renderStockList(stocks)}
                </div>
                <div className="text-xs text-gray-400 shrink-0">
                  {stocks.length}只
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
