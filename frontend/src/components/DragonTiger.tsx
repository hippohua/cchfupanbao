import { useEffect, useState } from 'react'
import type { DragonTigerData, DragonTigerStock } from '../types'
import { api } from '../api/client'

export default function DragonTiger() {
  const [data, setData] = useState<DragonTigerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [boardType, setBoardType] = useState<'all' | 'org' | 'hot_money'>('all')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await api.getDragonTigerList(boardType) as DragonTigerData
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [boardType])

  const formatMoney = (val: number) => {
    if (!val) return '-'
    if (val >= 100000000) return `${(val / 100000000).toFixed(2)}亿`
    if (val >= 10000) return `${(val / 10000).toFixed(2)}万`
    return val.toString()
  }

  const renderStockRow = (stock: DragonTigerStock) => {
    const isUp = stock.change >= 0
    return (
      <tr key={stock.thscode} className="hover:bg-gray-50">
        <td className="px-3 py-2">
          <div className="font-medium text-gray-900">{stock.name}</div>
          <div className="text-xs text-gray-400">{stock.ticker}</div>
        </td>
        <td className={`text-right text-sm font-medium ${isUp ? 'text-up' : 'text-down'}`}>
          {isUp ? '+' : ''}{(stock.change * 100).toFixed(2)}%
        </td>
        <td className="text-right text-sm">
          <span className={stock.net_value >= 0 ? 'text-up' : 'text-down'}>
            {formatMoney(stock.net_value)}
          </span>
        </td>
        <td className="text-right text-sm text-gray-600">{formatMoney(stock.buy_value)}</td>
        <td className="text-right text-sm text-gray-600">{formatMoney(stock.sell_value)}</td>
        <td className="text-sm text-gray-600">
          <span className="text-xs text-gray-400">{stock.limit_reason}</span>
        </td>
      </tr>
    )
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">龙虎榜</h3>
        </div>
        <div className="card-body">
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded" />
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
          <h3 className="card-title">龙虎榜</h3>
        </div>
        <div className="card-body text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div id="dragon" className="card">
      <div className="card-header">
        <h3 className="card-title">龙虎榜</h3>
        <div className="flex gap-1">
          {(['all', 'org', 'hot_money'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setBoardType(type)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                boardType === type
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? '全部' : type === 'org' ? '机构榜' : '游资榜'}
            </button>
          ))}
        </div>
      </div>
      <div className="card-body overflow-x-auto">
        <table className="data-table min-w-full">
          <thead>
            <tr>
              <th>股票</th>
              <th className="text-right">涨跌幅</th>
              <th className="text-right">净买入</th>
              <th className="text-right">买入</th>
              <th className="text-right">卖出</th>
              <th>原因</th>
            </tr>
          </thead>
          <tbody>
            {data?.stock_items?.map(renderStockRow)}
          </tbody>
        </table>

        {/* 游资榜 */}
        {boardType === 'hot_money' && data?.hot_money_items && data.hot_money_items.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">游资席位</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {data.hot_money_items.map((item) => (
                <div key={item.name} className="bg-gray-50 rounded p-2 border border-gray-100">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className={`text-xs ${item.buying >= 0 ? 'text-up' : 'text-down'}`}>
                    净买入 {formatMoney(item.buying)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
