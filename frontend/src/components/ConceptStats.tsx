import { useEffect, useState, useMemo } from 'react'
import type { LimitUpPoolData, LimitUpStock } from '../types'
import { api } from '../api/client'

export default function ConceptStats() {
  const [poolData, setPoolData] = useState<LimitUpPoolData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPool = async () => {
      try {
        setLoading(true)
        const data = await api.getLimitUpPool({ size: 200 }) as LimitUpPoolData
        setPoolData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败')
      } finally {
        setLoading(false)
      }
    }
    loadPool()
  }, [])

  // 按涨停原因分组统计
  const conceptStats = useMemo(() => {
    if (!poolData?.item) return []

    const groups: Record<string, LimitUpStock[]> = {}
    poolData.item.forEach((stock) => {
      const reason = stock.limit_up_reason || '其他'
      if (!groups[reason]) groups[reason] = []
      groups[reason].push(stock)
    })

    return Object.entries(groups)
      .map(([reason, stocks]) => ({
        reason,
        count: stocks.length,
        stocks,
      }))
      .sort((a, b) => b.count - a.count)
  }, [poolData])

  const formatMoney = (val: number) => {
    if (val >= 100000000) return `${(val / 100000000).toFixed(2)}亿`
    if (val >= 10000) return `${(val / 10000).toFixed(2)}万`
    return val.toString()
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">涨停板块</h3>
        </div>
        <div className="card-body">
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">涨停板块</h3>
        </div>
        <div className="card-body text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div id="concepts" className="card">
      <div className="card-header">
        <h3 className="card-title">涨停板块</h3>
        <span className="text-xs text-gray-500">共 {conceptStats.length} 个概念</span>
      </div>
      <div className="card-body overflow-x-auto">
        <table className="data-table min-w-full">
          <thead>
            <tr>
              <th className="w-12">#</th>
              <th>概念</th>
              <th className="text-right">涨停数</th>
              <th>涨停股</th>
              <th className="text-right">最高封单</th>
            </tr>
          </thead>
          <tbody>
            {conceptStats.map((item, index) => {
              const maxSeal = Math.max(...item.stocks.map((s) => s.max_seal_money || 0))
              return (
                <tr key={item.reason}>
                  <td className="text-gray-400">{index + 1}</td>
                  <td className="font-medium text-gray-900">{item.reason}</td>
                  <td className="text-right">
                    <span className="text-up font-bold">{item.count}</span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {item.stocks.slice(0, 5).map((s) => (
                        <span
                          key={s.thscode}
                          className="text-xs px-2 py-0.5 bg-red-50 text-red-700 rounded border border-red-100"
                        >
                          {s.name}
                        </span>
                      ))}
                      {item.stocks.length > 5 && (
                        <span className="text-xs px-2 py-0.5 text-gray-400">+{item.stocks.length - 5}</span>
                      )}
                    </div>
                  </td>
                  <td className="text-right text-sm text-gray-600">{formatMoney(maxSeal)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
