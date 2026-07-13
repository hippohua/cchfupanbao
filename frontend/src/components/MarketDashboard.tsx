import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, Target, BarChart3 } from 'lucide-react'
import type { PriceSnapshot } from '../types'
import { api } from '../api/client'

interface DashboardData {
  marketIndices: PriceSnapshot[]
  limitUpCount: number
  limitDownCount: number
  upCount: number
  downCount: number
  sealRate: number
  maxBoard: number
  yesterdayLimitUp: number
  yesterdayBoard: number
}

export default function MarketDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        // 获取大盘指数
        const indices = await api.getMarketSnapshot('000001.SH,399001.SZ,399006.SZ,000688.SH') as { item: PriceSnapshot[] }

        // 获取涨停池来统计
        const pool = await api.getLimitUpPool() as { item: { total: number }[] }
        const limitUpCount = pool.item?.length || 0

        // 模拟数据（待API完善后替换）
        setData({
          marketIndices: indices.item || [],
          limitUpCount,
          limitDownCount: 0,
          upCount: 0,
          downCount: 0,
          sealRate: 0,
          maxBoard: 0,
          yesterdayLimitUp: 0,
          yesterdayBoard: 0,
        })
      } catch (err) {
        console.error('加载大盘数据失败:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const formatIndex = (snapshot: PriceSnapshot) => {
    const isUp = snapshot.price_change_ratio_pct >= 0
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{snapshot.thscode}</span>
          {isUp ? (
            <TrendingUp size={16} className="text-up" />
          ) : (
            <TrendingDown size={16} className="text-down" />
          )}
        </div>
        <div className={`text-2xl font-bold ${isUp ? 'text-up' : 'text-down'}`}>
          {snapshot.last_price.toFixed(2)}
        </div>
        <div className={`text-sm mt-1 ${isUp ? 'text-up' : 'text-down'}`}>
          {isUp ? '+' : ''}{snapshot.price_change.toFixed(2)} ({isUp ? '+' : ''}{snapshot.price_change_ratio_pct.toFixed(2)}%)
        </div>
      </div>
    )
  }

  const StatCard = ({ icon: Icon, title, value, subValue, color }: {
    icon: typeof ArrowUp
    title: string
    value: string
    subValue?: string
    color: string
  }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={color} />
        <span className="text-sm text-gray-500">{title}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subValue && <div className="text-xs text-gray-400 mt-1">{subValue}</div>}
    </div>
  )

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 animate-pulse h-24" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 大盘指数 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {data?.marketIndices.map((idx) => (
          <div key={idx.thscode}>{formatIndex(idx)}</div>
        ))}
      </div>

      {/* 情绪指标 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <StatCard icon={ArrowUp} title="上涨家数" value={data ? data.upCount.toLocaleString() : '--'} color="text-up" />
        <StatCard icon={ArrowDown} title="下跌家数" value={data ? data.downCount.toLocaleString() : '--'} color="text-down" />
        <StatCard icon={Target} title="涨停家数" value={data ? String(data.limitUpCount) : '--'} color="text-up" subValue="非ST" />
        <StatCard icon={Target} title="跌停家数" value={data ? String(data.limitDownCount) : '--'} color="text-down" subValue="非ST" />
        <StatCard icon={BarChart3} title="封板率" value={data ? `${data.sealRate.toFixed(1)}%` : '--'} color="text-blue-500" />
        <StatCard icon={TrendingUp} title="连板高度" value={data ? `${data.maxBoard}板` : '--'} color="text-up" />
        <StatCard icon={ArrowUp} title="昨涨停表现" value={data ? `${data.yesterdayLimitUp >= 0 ? '+' : ''}${data.yesterdayLimitUp.toFixed(2)}%` : '--'} color="text-up" />
        <StatCard icon={ArrowUp} title="昨连板表现" value={data ? `${data.yesterdayBoard >= 0 ? '+' : ''}${data.yesterdayBoard.toFixed(2)}%` : '--'} color="text-up" />
      </div>
    </div>
  )
}
